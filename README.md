📖 About the Project
BazaarDor (বাজারদর) is a market-price web application designed to
make product and market information easier to explore. It provides
category-based browsing, product details, market price comparisons, and
a user authentication experience.

The interface is designed with Bangla-speaking users in mind, including
Bangla labels and date display. Authenticated users can manage their
profile and upload a profile picture stored on Cloudinary.
✨ Features
- 📊 Market Price Information --- Explore product prices and
  available market information.
- 🔎 Product Browsing --- Browse products and open individual
  product detail pages.
- 🗂️ Category Navigation --- Navigate product categories using a
  dedicated category menu.
- 📈 Price Change Details --- Display today, previous-day, and
  previous-week prices when supplied by the API.
- 🌐 Bangla-Friendly Interface --- Bangla labels and Bangla date
  display alongside English date information.
- 🔐 User Authentication --- Sign up, sign in, and sign out using
  Better Auth.
- 🔑 Social Sign-In --- Google and GitHub sign-in, when provider
  credentials are configured.
- 👤 Editable User Profile --- Update a user's name and profile
  picture.
- ☁️ Cloudinary Image Uploads --- Upload profile pictures and
  store their secure Cloudinary URLs.
- 📱 Responsive Layout --- A responsive navigation and page layout
  for different screen sizes.
- 🔔 User Feedback --- Toast notifications for important actions
  and errors.
- 🛡️ Form Validation --- Client-side checks for profile names and
  profile-image file type and size.
Note: Live market data, price-history fields, and social sign-in
depend on the configured API and provider credentials.

🧰 Technology Stack
  Technology                                             Purpose
  Next.js                         React framework, routing, and
                                                         application pages

  React                            Component-based user interface

  TypeScript          Type safety

  Tailwind CSS               Utility-first styling

  DaisyUI                        UI styling utilities and component
                                                         classes

  HeroUI                      UI components such as buttons

  Better Auth            Authentication and session
                                                         management

  MongoDB                    User and application data storage

  Cloudinary                  Profile-picture storage and image
                                                         delivery

  React                                                 Toast notifications
  Toastify   

  Lucide                          Icons, where used

  Market Data API                                        Product, category, and market-price
                                                     data
🚀 Getting Started
1. Requirements
Install the following before starting:
- Node.js (a current supported LTS version is recommended)
- npm
- A MongoDB database
- A Cloudinary account for profile-image uploads
- API credentials for any enabled social sign-in providers
