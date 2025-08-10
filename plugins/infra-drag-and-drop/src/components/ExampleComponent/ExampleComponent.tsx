import React, { useState, useMemo } from 'react';
import { InfoCard } from '@backstage/core-components';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Chip, Grid, Typography } from '@material-ui/core';

// Infra item type for drag-drop
const ItemTypes = {
  RESOURCE: 'resource',
};

// Draggable Chip component
const DraggableChip = ({
  name,
  origin,
}: {
  name: string;
  origin: 'missing' | 'desired';
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.RESOURCE,
    item: { name, origin },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Chip
      ref={drag}
      label={name}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        margin: '4px',
      }}
      color={origin === 'desired' ? 'primary' : 'default'}
      variant={origin === 'desired' ? 'filled' : 'outlined'}
    />
  );
};

// Droppable container for missing or desired infra
const DropContainer = ({
  title,
  items,
  onDrop,
  allowedOrigin,
  emptyMessage,
  color,
}: {
  title: string;
  items: string[];
  onDrop: (name: string, from: 'missing' | 'desired') => void;
  allowedOrigin: 'missing' | 'desired'; // which origin this container accepts
  emptyMessage: string;
  color?: 'primary' | 'default';
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.RESOURCE,
    drop: (item: { name: string; origin: 'missing' | 'desired' }) => {
      if (item.origin !== allowedOrigin) {
        onDrop(item.name, item.origin);
      }
    },
    canDrop: (item: { origin: string }) => item.origin !== allowedOrigin,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <InfoCard title={title}>
      <Box
        ref={drop}
        p={2}
        minHeight={120}
        border="2px dashed"
        borderColor={isOver ? 'primary.main' : 'text.disabled'}
        borderRadius="4px"
        bgcolor={isOver ? 'rgba(25, 118, 210, 0.1)' : 'transparent'}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={1}
        style={{ minHeight: 120 }}
      >
        {items.length === 0 ? (
          <Typography color="textSecondary">{emptyMessage}</Typography>
        ) : (
          items.map((name) => (
            <DraggableChip key={name} name={name} origin={allowedOrigin} />
          ))
        )}
      </Box>
    </InfoCard>
  );
};

export const ExampleComponent = () => {
  // Sample data simulating desired vs current infra
  const desiredInitial = ['VM', 'LB']; // Already desired
  const current = ['VM']; // Currently deployed

  // Calculate missing resources
  const missingInitial = useMemo(
    () => desiredInitial.concat(['CloudRun', 'CloudSQL']).filter((x) => !current.includes(x)),
    []
  );

  const [desired, setDesired] = useState<string[]>(desiredInitial);
  const [missing, setMissing] = useState<string[]>(missingInitial);

  const handleDrop = (name: string, from: 'missing' | 'desired') => {
    if (from === 'missing') {
      // Moved from Missing to Desired
      if (!desired.includes(name)) {
        setDesired([...desired, name]);
        setMissing(missing.filter((x) => x !== name));
        console.log(`Provisioning resource: ${name}`);
      }
    } else {
      // Moved from Desired to Missing (removal)
      if (!missing.includes(name)) {
        setMissing([...missing, name]);
        setDesired(desired.filter((x) => x !== name));
        console.log(`Removing resource: ${name}`);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DropContainer
            title="Missing Resources"
            items={missing}
            onDrop={handleDrop}
            allowedOrigin="missing"
            emptyMessage="No missing resources"
            color="default"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DropContainer
            title="Desired Infrastructure"
            items={desired}
            onDrop={handleDrop}
            allowedOrigin="desired"
            emptyMessage="Drag resources here to provision"
            color="primary"
          />
        </Grid>
      </Grid>
    </DndProvider>
  );
};
