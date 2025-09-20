# StarBook

StarBook is a modern SaaS platform for collecting, managing, and showcasing customer testimonials and reviews effortlessly. Designed to help businesses build social proof and enhance brand trust, StarBook offers seamless integrations, AI-powered insights, and an elegant user experience.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Customizable Landing Pages**: Create beautiful, responsive testimonial pages with multiple themes
- **Twitter Integration**: Import and display tweets as testimonials by simply pasting tweet URLs
- **AI-Powered Insights**: Leverage Google Gemini AI to analyze and summarize customer feedback
- **Interactive Star Ratings**: Collect ratings with a smooth star rating UI
- **Embedded Widget**: Easily embed testimonials on any website using a responsive iframe
- **Image Uploads**: Support for customer images via Cloudinary integration
- **Secure Authentication**: User accounts and authentication powered by Clerk
- **Subscription Plans**: Manage Pro subscriptions via Stripe payment integration
- **Analytics Dashboard**: Comprehensive dashboard to manage and track testimonials

---

## Demo

Explore the live app: [https://starbook.wasifkareem.com](https://starbook.wasifkareem.com)

<a href="https://codepen.io/Wasif-Kareem/pen/OJeExjy?editors=1000"
rel="noopener noreferrer"
target="_blank">
<img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=appveyor" alt="Live Demo">
</a>

Check out the 3-minute demo video below:

https://github.com/user-attachments/assets/43731594-7035-41d1-8460-758f99126f0a

---

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Backend**: Next.js API Routes, Prisma ORM, Supabase
- **Authentication**: Clerk
- **Payments**: Stripe
- **AI Integration**: Google Gemini API
- **File Storage**: Cloudinary
- **Animation**: Framer Motion

---

## Getting Started

### Prerequisites

- Node.js v18 or newer
- Supabase database
- Clerk account for authentication
- Stripe account for payment processing
- Cloudinary account for image uploads

### Installation

1. Clone the repository

```bash
git clone https://github.com/wasifkareem/StarBook.git
cd StarBook
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root with the following keys:

```env
DATABASE_URL=your_postgres_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
GOOGLE_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app
NEXT_BASE_URL=http://localhost:3000
PORT=3000
```

4. Run database migrations

```bash
npx prisma migrate deploy
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the app.

### Add this Code to a replit template website

```html
<iframe
  id="starbook-cmdjursce0000skxy386qm721"
  src="https://starbook.wasifkareem.com/embed/cmdjursce0000skxy386qm721?dark=false"
  frameborder="0"
  scrolling="no"
  width="100%"
></iframe>
<script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent"></script>
<script>
  iframeResize(
    { license: "GPLv3", log: true, checkOrigin: false },
    "#starbook-cmdjursce0000skxy386qm721"
  );
</script>
```

---

## Usage

- Sign up or log in using Clerk authentication
- Create a testimonial landing page with a theme of your choice
- Add testimonials manually or import tweets via URLs
- View AI-generated insights to better understand your customer feedback
- Embed the testimonial widget on your website for social proof
- Manage and upgrade subscription plans with Stripe billing

---

## Roadmap

- [x] Basic testimonial collection and management
- [x] Twitter integration for importing testimonials
- [x] AI-powered feedback insights with Google Gemini
- [x] Stripe subscription management
- [x] Image uploads via Cloudinary
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Mobile app development

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes and feature requests.

---

## Contact

**Wasif Kareem**

- GitHub: [https://github.com/wasifkareem](https://github.com/wasifkareem)
- LinkedIn: [[LinkedIn](https://www.linkedin.com/in/wasifdev2762/)]
- Email: wasifkareem2762@gmail.com

---

_Thank you for checking out StarBook! Your feedback and contributions are highly appreciated._
