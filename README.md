# DeepGuard - Deepfake Detection System

DeepGuard is an advanced AI-powered deepfake detection system that helps combat misinformation and protect digital authenticity in the era of synthetic media.

## Features

- 🔍 Real-time deepfake detection
- 🖼️ Support for multiple image formats (JPEG, PNG, GIF, WEBP)
- 🤖 Multiple AI models for analysis
- 📊 Detailed confidence scores and analysis
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- 📜 Analysis history tracking

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons

- **AI/ML:**
  - Xception
  - Gradio API Integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NguyenTrongNguyen04/DeepFake-Detection
cd deepguard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select a model from the available options
2. Upload an image using drag & drop or file selection
3. Wait for the analysis to complete
4. View the results showing:
   - Deepfake probability
   - Confidence score
   - Technical details
   - Analysis history

## Project Structure

```
project/
├── src/
│   ├── components/     # React components
│   ├── sections/       # Page sections
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── package.json       # Project dependencies
```

## API Integration

The project integrates with the Gradio API for deepfake detection. The API endpoint is configured in `src/utils/api.ts`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [EfficientNetB4](https://github.com/lukemelas/EfficientNet-PyTorch) for the deep learning model
- [Gradio](https://gradio.app/) for the API integration
- [Lucide Icons](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for the animations

## Contact

Nguyen Trong Nguyen - [nguyentrongnguyen.profile@gmail.com](mailto:nguyentrongnguyen.profile@gmail.com)

Project Link: [https://github.com/NguyenTrongNguyen04/DeepFake-Detection](https://github.com/NguyenTrongNguyen04/DeepFake-Detection) 
