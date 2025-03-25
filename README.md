# Biz-Metrics

Biz-Metrics is a business analytics platform that provides real-time insights into user engagement, sales performance, and operational efficiency. The platform is built with **Next.js**, **Tailwind CSS**, **MUI**, and **Chart.js** for data visualization.

## Features

- **User Authentication**: Secure login and signup with Firebase Authentication.
- **Dashboard Analytics**: Displays key business metrics using **Chart.js**.
- **Responsive UI**: Styled with **Tailwind CSS** and **MUI** components.
- **Business Insights**: Tracks user engagement, sales trends, and operational efficiency.


## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, MUI, ShadCN
- **Backend**: Firebase Firestore
- **Data Visualization**: Chart.js

## Installation and Setup

### Prerequisites
- Node.js (>= 16.0.0)
- Git
- Firebase account (for authentication and Firestore)

### Steps
1. **Clone the Repository**
   ```sh
   git clone https://github.com/lexxAsido/biz-metrics.git
   cd biz-metrics
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore.
   - Get your Firebase configuration and create a `.env.local` file:
     ```sh
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Using MUI and Chart.js

### MUI
- **Material UI** is used for designing UI components.
`

### Chart.js
- **Chart.js** is used for visualizing business metrics.


## Deployment

Biz-Metrics is deployed on **Vercel**. View it live at:
[https://biz-metrics.vercel.app/](https://biz-metrics.vercel.app/)

## Contribution

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License



For any issues, contact [Asido Alexandar](https://github.com/lexxAsido).

