# Full Stack React App

This is a basic full-stack application built using **React (frontend)** and **Express + MongoDB (backend)**.

---

## 🚀 How to Run the Project

### 🖥️ Frontend Setup (Vite + React)

1. Navigate to the frontend directory:

   ```bash
   cd front-end
   ```

2. Start the development server using Vite:

   ```bash
   npm run dev
   ```

3. **Ensure port visibility is set to public:**

   * In Codespaces or your cloud IDE, go to the **PORTS** tab.
   * Locate the frontend port (usually `5173`) and set its visibility to **Public**.

✅ Your frontend will be accessible via a forwarded URL (e.g., `https://...5173.app.github.dev`).

---

### 🌐 Backend Setup (Express + MongoDB)

1. Navigate to the backend directory:

   ```bash
   cd back-end
   ```

2. Get your current IP address (for MongoDB Atlas network access):

   ```bash
   curl ifconfig.me
   ```

3. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), log in, and:

   * Set up your cluster (if not already done)
   * Navigate to **Network Access** and **Add IP Address** (use the IP you got from step 2)
   * Go to **Database** → **Connect** → **Drivers**
   * Copy the connection string (e.g., `mongodb+srv://...`)

4. In your `back-end` folder, create a `.env` file and add:

   ```env
   MONGO_URI=your_copied_connection_string_here
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

6. **Ensure port visibility is set to public:**

   * In the **PORTS** tab, find port `8000` and set its visibility to **Public**.

✅ If successful, you should see:

```
Server is listening on port 8000
```
