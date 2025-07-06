
<img width="318" height="248" alt="Image" src="https://github.com/user-attachments/assets/3d4a47ec-e950-4334-baf3-b7f1376faf6c" />

# InData - Data Analysis Application with Artificial Intelligence

## 📋 Project Description

InData is a web application for data analysis and interpretation developed as part of an internship within the Information Systems Department (DSI) of OCP Jorf Lasfar group. The application allows users to upload Excel and CSV files, analyze them using artificial intelligence, and visualize results through interactive charts.

## 🎯 Objectives

- **Develop an intuitive web application**: User-friendly interface for loading and visualizing data files
- **Data analysis and interpretation**: Use AI algorithms to analyze data and generate relevant interpretations
- **Data visualization**: Interactive graphical representations to facilitate understanding
- **User management**: Secure authentication and authorization system

## 🚀 Features

### Authentication
- ✅ User account creation
- ✅ Login/Logout
- ✅ GitHub authentication
- ✅ Secure session management

### File Management
- ✅ Upload Excel (.xlsx) and CSV files
- ✅ File format validation
- ✅ Automatic data processing
- ✅ AI interpretation (Google Generative AI)

### Visualization
- ✅ Interactive charts with Streamlit
- ✅ Chart type selection
- ✅ Real-time visualization
- ✅ Responsive interface

### History
- ✅ Processed files backup
- ✅ Search by filename
- ✅ Results pagination
- ✅ Access to previous interpretations

## 🛠️ Technologies Used

### Frontend
- **Next.js** - React framework for web development
- **React.js** - JavaScript library for user interface
- **Tailwind CSS** - CSS framework for styling
- **Axios** - HTTP client for API requests
- **NextAuth.js** - Authentication for Next.js
- **SweetAlert2** - Elegant alert messages

### Backend
- **Flask** - Python web framework
- **Python** - Main programming language
- **Google Generative AI** - Artificial intelligence for data analysis
- **Pandas** - Data manipulation and analysis
- **Streamlit** - Web application creation for visualization

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB and Node.js
- **MongoDB Compass** - Graphical interface for MongoDB

### Development Tools
- **Visual Studio Code** - Code editor
- **Postman** - API testing
- **Jira** - Project management (SCRUM methodology)
- **StarUML** - UML modeling
- **Visual Paradigm** - Diagrams and design

## 🧰 General Technical Architecture
<img width="984" height="560" alt="Image" src="https://github.com/user-attachments/assets/4e187aba-3f1d-4e6c-8fc4-53ddf00da206" />

## 🔧 Installation and Configuration

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB
- Google Cloud Platform account (for Generative AI API)

### Frontend Installation

```bash
# Clone the repository
git clone [repository-url]
cd indata/frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configurations

# Start development server
npm run dev
```

### Backend Installation

```bash
# Navigate to backend folder
cd ../backend

# Create virtual environment
python -m venv venv

# Configure environment variables
# Edit .env with your configurations

# Start Flask server
python app.py
```

## 🌍 Environment Variables

### Frontend (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
MONGODB_URI=mongodb://localhost:27017/indata
BACKEND_URL=http://localhost:5000
```

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/indata
GOOGLE_API_KEY=your_google_api_key
FLASK_ENV=development
SECRET_KEY=your_flask_secret_key
```

## 🚀 Usage

1. **Access the application**: Open your browser and go to `http://localhost:3000`
2. **Create an account**: Sign up or log in with GitHub
3. **Upload a file**: Select an Excel or CSV file
4. **Analyze data**: AI automatically analyzes your data
5. **Visualize results**: Explore interactive charts
6. **View history**: Find your previous analyses

## 🎨 Screenshots

### Home Page
Modern and responsive interface showcasing main features
<img width="984" height="456" alt="Image" src="https://github.com/user-attachments/assets/532cb8a5-70f2-4b24-a474-c4ab97dd1262" />

### Login Page

<img width="984" height="518" alt="Image" src="https://github.com/user-attachments/assets/4fd7f1a6-ee67-41fa-8669-7a81b9c1ff08" />

### File Upload
Intuitive interface for file upload and analysis

<img width="1036" height="565" alt="Image" src="https://github.com/user-attachments/assets/96351c59-6296-430a-9056-a9091decf413" />
<img width="984" height="540" alt="Image" src="https://github.com/user-attachments/assets/9ee66724-62a4-4f8a-9bb6-234d608bc856" />
<img width="984" height="958" alt="Image" src="https://github.com/user-attachments/assets/d9d990b7-f813-45fa-bd37-835e026c4479" />

### Data Visualization
Interactive charts automatically generated by Streamlit
<img width="984" height="425" alt="Image" src="https://github.com/user-attachments/assets/62027d82-5c76-4237-8c12-90e7156c70b3" />

<img width="984" height="552" alt="Image" src="https://github.com/user-attachments/assets/4ab39e70-2db2-47b4-a05f-0b01469eb743" />

### Analysis History
Complete management of processed files with search and pagination



## 🔒 Security

- Password hashing
- Uploaded file validation
- Secure session management
- CORS attack protection
- Client and server-side data validation

## 📝 License

This project was developed as part of an academic internship at ENSA El Jadida in collaboration with OCP Group.

## 🤝 Acknowledgments

Special thanks to the DSI team at OCP Jorf Lasfar for their welcome, guidance, and support throughout this project.

---

**Developed with Meryem BOUKHRAIS**  
**ENSA El Jadida - Computer Engineering & Emerging Technologies**  
**Academic Year 2024-2025**
