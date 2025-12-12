# 🚀 Modern Portfolio Website

> A stunning, interactive portfolio built with React, Tailwind CSS, and modern web technologies.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.2-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Perfect on all devices (mobile, tablet, desktop)
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Interactive Animations** - Particle effects, 3D transforms, hover interactions
- 🌈 **Gradient Effects** - Beautiful color transitions throughout
- 📝 **Contact Form** - Integrated contact form with validation
- 🔗 **Social Links** - Direct links to GitHub, LinkedIn, and Email
- 🎯 **SEO Optimized** - Ready for search engines

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build Tool**: Vite 7.2
- **Animations**: CSS3 + Custom Keyframes

## 📦 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/UtkarshD04/portfolio.git
cd portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### Deploy to Vercel
```bash
# Connect GitHub repo to Vercel
# Auto-deploys on every push
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume.pdf          # Your resume file
├── src/
│   ├── components/
│   │   └── LoadingScreen.jsx
│   ├── data/
│   │   └── portfolioData.js # All portfolio data
│   ├── App.jsx             # Main component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Customization

### Update Personal Information

1. **Portfolio Data**: Edit `src/data/portfolioData.js`
   - Projects
   - Skills
   - Tech Stack
   - Achievements

2. **Contact Info**: Update in `src/App.jsx`
   - GitHub: `@UtkarshD04`
   - LinkedIn: `/in/utkarsh-dwivedi-085493302/`
   - Email: `dutkarsh@666gmail.com`

3. **Resume**: Replace `public/resume.pdf` with your resume

### Customize Colors

Edit `tailwind.config.js` to change the color scheme:

```js
theme: {
  extend: {
    colors: {
      // Add your custom colors
    }
  }
}
```

## 📱 Sections

- **Hero** - Name with rotating hover effect
- **About** - Personal introduction and skills
- **Projects** - Featured projects with live demos
- **Skills** - Technical expertise with animated progress bars
- **Contact** - Social links and contact form

## 🎯 Performance

- ⚡ Lazy loading for components
- 🗜️ Optimized bundle size
- 🎨 CSS animations (no heavy libraries)
- 📦 Code splitting

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Utkarsh Dwivedi**

- GitHub: [@UtkarshD04](https://github.com/UtkarshD04)
- LinkedIn: [Utkarsh Dwivedi](https://www.linkedin.com/in/utkarsh-dwivedi-085493302/)
- Email: dutkarsh@666gmail.com

## 🌟 Show your support

Give a ⭐️ if you like this project!

---

<p align="center">Made with ❤️ by Utkarsh Dwivedi</p>
