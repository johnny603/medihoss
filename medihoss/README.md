
# MediHoss

MediHoss is a modern media hosting web application built with Next.js, designed for secure and efficient file uploads. It integrates with Keyshade for cryptographic operations and Cloudinary for scalable media storage and delivery.

## Features

- Upload images and media files via a simple web interface
- Files are processed with Keyshade for enhanced security (encryption, hashing, or similar)
- Media is stored and served using Cloudinary
- Built-in error handling and clean UI

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- Yarn or npm
- Cloudinary account (for media storage)
- Keyshade credentials/configuration

### Installation
1. Clone the repository:
	 ```bash
	 git clone <your-repo-url>
	 cd medihoss
	 ```
2. Install dependencies:
	 ```bash
	 npm install
	 # or
	 yarn install
	 ```
3. Set up environment variables:
	 - Copy `.env.local.example` to `.env.local` (if example exists) or create `.env.local` manually.
	 - Add your Cloudinary and Keyshade credentials:
		 ```env
		 CLOUDINARY_CLOUD_NAME=your_cloud_name
		 CLOUDINARY_API_KEY=your_api_key
		 CLOUDINARY_API_SECRET=your_api_secret
		 KEYSHADE_SECRET=your_keyshade_secret
		 # Add any other required variables
		 ```

### Running the App
```bash
npm run dev
# or

```
Visit [http://localhost:3000](http://localhost:3000) to use the app.

### Usage
- Go to the Upload page (`/upload`)
- Select a file to upload
- The file will be processed and securely uploaded to Cloudinary
- You will receive a link to the hosted media

## Project Structure
- `src/app/` — Main application pages and API routes
- `src/lib/keyshade.ts` — Keyshade integration and cryptographic utilities
- `public/` — Static assets and icons

## Deployment
- Ensure all environment variables are set in your production environment
- Build the app:
	```bash
	npm run build
	# or
	yarn build
	```
- Start the production server:
	```bash
	npm start
	# or
	yarn start
	```

## License
MIT

---

For more details, see the code and comments in each file. Contributions are welcome!
