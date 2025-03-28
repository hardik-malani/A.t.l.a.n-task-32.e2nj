# Atlan SQL Runner (Frontend Simulation)

This project is a web-based application built with React, TypeScript, and Vite, designed to simulate the experience of running SQL queries and viewing results from local CSV files. It prioritizes performance, accessibility, and a clean user interface.

## Live Demo

**[https://a-t-l-a-n-task-32-e2nj.vercel.app/](https://a-t-l-a-n-task-32-e2nj.vercel.app/)**

## Overview

Develop a highly optimized, web-based, dummy SQL query application that simulates the experience of running SQL queries and viewing results from local CSV files (`orders.csv`, `order_details.csv`, `data-large.csv`). The application mimics professional SQL tools without a real backend, focusing on frontend performance and user experience.

## Features

*   **Query Editor:** A simple textarea accepts dummy SQL queries. An "Execute Query" button logs the input to the console. (Lazy-loaded, Memoized)
*   **Table Selection Sidebar:** Lists available CSV datasets. Allows users to select a table, highlighting the active selection.
*   **Virtualized Table Display:** Efficiently renders large CSV datasets using `react-window` with a sticky header and smooth scrolling. (Lazy-loaded with Suspense)
*   **Asynchronous CSV Parsing:** Uses **Web Workers** to parse CSV files off the main thread, ensuring UI responsiveness.
*   **Theme Toggle:** Switch between **Dark** and **Light** themes using React Context and CSS variables. (Lazy-loaded, Memoized)
*   **Performance Optimized:** Targets and achieves high Lighthouse scores (e.g., 100 Performance) through code splitting, async loading, virtualization, and worker usage.
*   **Accessibility:** Includes labels, and ARIA attributes for better screen reader support.
*   **Context-Menu:** Right-click context menu for simulated table operations.


## Architecture Diagram

![Architecture Diagram](https://i.imgur.com/6kugYOC.png)

## Technical Stack

*   **Framework:** React 19+ (with TypeScript)
*   **Build Tool:** Vite
*   **Styling:** CSS Modules & Global CSS with CSS Variables
*   **Data Parsing:** PapaParse (executed within a Web Worker)
*   **UI Virtualization:** `react-window`
*   **Icons:** `lucide-react`
*   **Core Web APIs:** Web Workers API
*   **React Features:**
    *   Hooks (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`)
    *   Code Splitting (`React.lazy`, `Suspense`)
    *   Memoization (`React.memo`)

## Performance Optimizations & Metrics

Achieving optimal performance was a primary goal, resulting in high Lighthouse scores (**100 Performance**) through several key techniques:

*   **Web Workers for CSV Parsing:** Offloading heavy CSV parsing (`PapaParse`) to a background thread prevents the main UI thread from freezing, ensuring responsiveness even with large datasets.
*   **Code Splitting (`React.lazy` & `Suspense`):** Components like `TableDisplay`, `QueryEditor`, and `ThemeToggle` are loaded only when needed, minimizing the initial JavaScript bundle size and drastically improving First Contentful Paint (FCP).
*   **Asynchronous Font Loading:** Google Fonts CSS is loaded non-blockingly using `rel="preload"`, preventing font requests from delaying the initial render (FCP).
*   **UI Virtualization (`react-window`):** Only the visible rows of the data table are rendered, enabling smooth scrolling and efficient handling of thousands of rows without performance degradation.
*   **Memoization (`React.memo`, `useCallback`):** Components and callbacks are memoized to prevent unnecessary re-renders, optimizing updates after the initial load.
*   **Deferred Initial Data Load:** The application starts without loading any table data. Data fetching and parsing are initiated only upon user interaction (selecting a table), ensuring the fastest possible initial paint.

*(Achieved metrics based on Lighthouse run on production build)*
*   **Performance Score:** **100**
*   **First Contentful Paint (FCP):** **~0.4s**
*   **Accessibility:** 91
*   **Largest Contentful Paint (LCP):** 0.5 s
*   **Total Blocking Time (TBT):** 0 ms

   **Performance Reports:**

<div align="center" style="display: flex;">
  <figure style="display: inline-block; margin: 10px;">
    <img src="https://res.cloudinary.com/dbm856uys/image/upload/v1743201605/nux21cbsasrh2amcnmum.png" alt="Lighthouse Performance Report" width="400"/>
    <figcaption>Lighthouse</figcaption>
  </figure>
  <figure style="display: inline-block; margin: 10px;">
    <img src="https://res.cloudinary.com/dbm856uys/image/upload/v1743201606/yaxf6bdl1vljgf11xi6m.png" alt="GTmetrix Performance Report" width="400"/>
    <figcaption>GTmetrix</figcaption>
  </figure>
</div>

## Author

* Hardik Malani
