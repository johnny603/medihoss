

# MediHoss

MediHoss is a modern media hosting web application built with Next.js, designed for secure and efficient file uploads. It integrates with Keyshade for cryptographic operations and Cloudinary for scalable media storage and delivery.

## Keyshade Secret Management

This project uses [Keyshade](https://keyshade.io/) for secure secret management. All sensitive credentials (such as Cloudinary API keys) are accessed at runtime using a single Keyshade-managed private key. To run this project, you must have your Keyshade private key file located at `~/.keyshade/private-keys.json`.

**How it works:**

- The backend loads the private key from your local file system.
- All required secrets (e.g., Cloudinary credentials) are fetched securely from Keyshade as needed.
- This approach avoids hardcoding secrets or storing them in environment files.

**Setup (only if not already configured):**

If your system already has the Keyshade private key and required secrets in place, no further setup is needed.

Otherwise, follow these steps:

1. Sign up for Keyshade and add your secrets to your Keyshade vault.
2. Download your private key and place it at `~/.keyshade/private-keys.json`.
3. The app will automatically use this key to access secrets at runtime.

## Cloudinary Free Plan

This project uses the free [Cloudinary](https://cloudinary.com/pricing) plan for media uploads and transformations.

**Free Plan Features:**

- 3 users
- 1 product environment
- 25 monthly credits
- 500 admin API limit
- 10 MB max image file size
- 100 MB max video file size
- 10 MB max raw file size
- 100 MB max image transformation size
- 40 MB max video transformation size
- 25 MP max image megapixel
- 50 MP max megapixel in all frames

See the [Cloudinary pricing page](https://cloudinary.com/pricing) for more details.

## Rate Limiting

To ensure fair usage and prevent abuse, this project implements automatic rate limiting for user uploads. Each user (by IP address) is limited to a certain number of uploads per minute. This helps stay within the limits of the free Cloudinary plan and protects the service from excessive use.

You can adjust the rate limiting settings in the API route code as needed.


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
yarn dev
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
