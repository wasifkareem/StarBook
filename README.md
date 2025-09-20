# StarBook

StarBook is a powerful testimonial collection platform that helps businesses gather, manage, and showcase customer feedback seamlessly. Built for startups and growing companies to collect authentic reviews and grow their reputation effortlessly.

![StarBook Demo](https://github.com/user-attachments/assets/placeholder-demo-image.png)

## Features

- 🎨 **Beautiful Landing Pages**: Create dedicated testimonial collection pages with customizable themes
- 🐦 **Twitter Integration**: Import tweets as testimonials by simply pasting tweet URLs
- 🤖 **AI-Powered Insights**: Generate insights from collected feedback using Google Gemini AI
- 📊 **Analytics Dashboard**: Track testimonial performance and manage all feedback in one place
- 🎨 **Customizable Themes**: Multiple display options with dark/light mode support
- 🔗 **Easy Embedding**: One-click website integration with responsive iframe embedding
- ⭐ **Star Ratings**: Interactive star rating system for testimonials
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🔐 **Secure Authentication**: User authentication and authorization via Clerk
- 💳 **Payment Integration**: Stripe integration for Pro plan subscriptions
- 📸 **Image Uploads**: Testimonial photos with Cloudinary integration
- 🎯 **Public Collection Pages**: Shareable links for customers to submit testimonials
- 🚀 **Performance Optimized**: Built with Next.js 15 and optimized for speed

## Built with

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [Cloudinary](https://cloudinary.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Framer Motion](https://www.framer.com/motion/)

### Tools

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

## Feature Requests

To request a feature open a [GitHub issue](https://github.com/yourusername/starbook/issues).

## Contribution Guidelines

Thank you for considering contributing to StarBook! Please follow these guidelines to ensure smooth collaboration:

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine:
3. Create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and ensure they adhere to the project's coding style and guidelines.
5. Test your changes thoroughly to avoid introducing bugs.
6. Commit your changes with clear and descriptive commit messages:

   ```bash
   git commit -m 'feat: Add your descriptive commit message'
   ```

   **Note:** Before committing changes, ensure you include one of these tags in your commit message: `feat, fix, docs, style, refactor, test, chore`.

7. Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```

8. Open a pull request against the `main` branch of the original repository.
9. Provide a clear and concise description of your changes in the pull request, along with any relevant information.
10. Ensure your pull request passes all checks and tests before requesting a review.

### Setting Up Environment Variables

To run the project locally, you need to set up the following environment variables:

```env
# DATABASE
DATABASE_URL=postgresql://username:password@localhost:5432/starbook

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# GOOGLE AI
GOOGLE_API_KEY=

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# APP CONFIGURATION
NEXT_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StarBook
```
