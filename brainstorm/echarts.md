In Backstage, for a custom frontend plugin i have planned to use Echarts library for visualization

Alright — here’s a **full working example** of a Backstage custom frontend plugin using **ECharts** via `echarts-for-react`, with mock API data.
This will let you just drop it into your plugin and start visualizing.

---

## **1. Install Dependencies**

From your Backstage app root:

```bash
yarn workspace @your-org/plugin-myplugin add echarts echarts-for-react
```

(Replace `@your-org/plugin-myplugin` with your plugin package name.)

---

## **2. Plugin Structure**

Inside `plugins/myplugin/src/components`, we’ll create:

```
MyChartComponent.tsx
MyPluginPage.tsx
```

---

## **3. MyChartComponent.tsx**

```tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

type MyChartProps = {
  labels: string[];
  values: number[];
};

export const MyChartComponent = ({ labels, values }: MyChartProps) => {
  const option = {
    title: {
      text: 'Sample Bar Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: values,
        itemStyle: {
          color: '#3f51b5',
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      opts={{ renderer: 'svg' }} // Use 'canvas' if performance is an issue
    />
  );
};
```

---

## **4. MyPluginPage.tsx**

```tsx
import React from 'react';
import { Content, Header, Page } from '@backstage/core-components';
import { MyChartComponent } from './MyChartComponent';

export const MyPluginPage = () => {
  const [labels, setLabels] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockLabels = ['A', 'B', 'C', 'D', 'E'];
      const mockValues = [5, 20, 36, 10, 15];
      setLabels(mockLabels);
      setValues(mockValues);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Page themeId="tool">
      <Header title="My Plugin with ECharts" subtitle="Interactive data visualization" />
      <Content>
        {loading ? (
          <div>Loading chart...</div>
        ) : (
          <MyChartComponent labels={labels} values={values} />
        )}
      </Content>
    </Page>
  );
};
```

---

## **5. Register the Page in Your Plugin**

In your `plugins/myplugin/src/plugin.ts`:

```ts
import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { MyPluginPage } from './components/MyPluginPage';

export const myPlugin = createPlugin({
  id: 'myplugin',
  routes: {
    root: MyPluginPage, // directly mapping for demo purposes
  },
});

export const MyPluginPageExtension = createRoutableExtension({
  name: 'MyPluginPage',
  component: () => Promise.resolve(MyPluginPage),
});
```

---

## **6. Add a Route in App**

In `packages/app/src/App.tsx`:

```tsx
import { MyPluginPageExtension } from '@your-org/plugin-myplugin';

<Route path="/myplugin" element={<MyPluginPageExtension />} />
```

---

## **7. Run**

```bash
yarn dev
```

Navigate to:

```
http://localhost:3000/myplugin
```

You’ll see your ECharts bar chart rendered with mock API data.

---

✅ This example:

* Keeps chart code **modular** (`MyChartComponent` only cares about rendering).
* Simulates API fetch with `setTimeout` — easy to replace with real backend.
* Works inside Backstage’s theme system (`Page` + `Content` + `Header`).
* Uses **`echarts-for-react`** for React lifecycle safety.

---

If you want, I can extend this to:

* Add **multiple chart types** (line, pie, etc.).
* Fetch **real data from your Backstage backend plugin**.
* Support **dynamic themes** so charts adapt to Backstage dark/light mode.

Do you want me to extend it with **dark/light mode support**? That’s one place where ECharts really pops in Backstage.
