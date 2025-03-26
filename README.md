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
*   **(Future Feature):** Right-click context menu for simulated table operations.


## Architecture Diagram

![Architecture Diagram](https://i.imgur.com/6kugYOC.png)
