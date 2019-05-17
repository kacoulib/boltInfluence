# Next.js example with [`graphql-react`](https://github.com/jaydenseric/graphql-react)

[`graphql-react`](https://github.com/jaydenseric/graphql-react) is a lightweight but powerful [GraphQL](https://graphql.org) client for React; the first [Relay](https://facebook.github.io/relay) and [Apollo](https://apollographql.com/docs/react) alternative with server side rendering.

See how it can be used in a Next.js app for GraphQL queries with server side rendering and client side data hydration:

- In `pages/_app.js` a [custom `App` component](https://github.com/zeit/next.js#custom-app) is decorated with the [`withGraphQL`](https://github.com/jaydenseric/next-graphql-react/#function-withgraphql) [higher-order component](https://reactjs.org/docs/higher-order-components) from [`next-graphql-react`](https://github.com/jaydenseric/next-graphql-react), generating a `graphql` prop that populates the [`Provider`](https://github.com/jaydenseric/graphql-react#function-provider) component from [`graphql-react`](https://github.com/jaydenseric/graphql-react).
- In `pages/index.js` the [`Query`](https://github.com/jaydenseric/graphql-react#function-query) component from [`graphql-react`](https://github.com/jaydenseric/graphql-react) is used to query the [GraphQL Pokémon API](https://github.com/lucasbento/graphql-pokemon) and show a picture of Pikachu.

## Setup

1. Download the example:

   ```sh
   curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-graphql-react
   ```

2. Change directory to it:

   ```sh
   cd with-graphql-react
   ```

3. Install it:

   ```sh
   npm install
   ```

4. Run it:

   ```sh
   npm run dev
   ```


## Project structure

```
.
├── boilerplate                         # Boilerplate with React, Material-UI, Next, Express, Mongoose, MongoDB 
├── book                                # Codebases for each chapter of our book
├── components                          # React components
│   ├── admin                           # Components used on Admin pages
│   │   ├── EditBook.js                 # Edit title, price, and repo of book
│   │   ├── GiveFreeBook.js             # Give free book to user
│   ├── customer                        # Components used on Customer pages
│   │   ├── Bookmark.js                 # Bookmark a section within a book chapter
│   │   ├── BuyButton.js                # Buy book
│   ├── BookReviews.js                  # Component that outputs grid of reviews
│   ├── Header.js                       # Header component
│   ├── HomeFooter.js                   # Footer component on homepage
│   ├── HomeHeader.js                   # Header component on homepage
│   ├── MenuDrop.js                     # Dropdown menu
│   ├── Notifier.js                     # In-app notifications for app's users
│   ├── SubscribeForm.js                # Form to subscribe to MailChimp newsletter
│   ├── TOC.js                          # Table of Contents
├── lib                                 # Code available on both client and server
│   ├── api                             # Client-side API methods
│   │   ├── admin.js                    # Admin user methods
│   │   ├── customer.js	                # Customer user methods
│   │   ├── getRootURL.js               # Returns ROOT_URL
│   │   ├── public.js                   # Public user methods
│   │   ├── sendRequest.js              # Reusable code for all GET and POST requests
│   ├── SharedStyles.js                 # List of _reusable_ styles
│   ├── context.js                      # Context for Material-UI integration
│   ├── env.js                          # Universal config for environmental variables
│   ├── gtag.js                         # Universal config for Google Analytics
│   ├── notifier.js                     # Contains notify() function that loads Notifier component
│   ├── withAuth.js                     # HOC that passes user to pages and more
│   ├── withLayout.js                   # HOC for SSR with Material-UI and more
├── pages                               # Pages
│   ├── admin                           # Admin pages
│   │   ├── add-book.js                 # Page to add a new book
│   │   ├── book-detail.js              # Page to view book details and sync content with Github
│   │   ├── edit-book.js                # Page to update title, price, and repo of book
│   │   ├── index.js                    # Main Admin page that has all books and more
│   ├── customer                        # Customer pages
│   │   ├── my-books.js                 # Customer's dashboard
│   ├── public                          # Public pages (accessible to logged out users)
│   │   ├── login.js                    # Login page
│   │   ├── read-chapter.js             # Page with chapter's content
│   ├── _document.js                    # Allows to customize pages (feature of Next.js)
│   ├── book.js                         # Book page
│   ├── index.js                        # Homepage
│   ├── tutorials.js                    # Tutorials page
├── server                              # Server code
│   ├── api                             # Express routes, route-level middleware
│   │   ├── admin.js                    # Admin routes
│   │   ├── customer.js                 # Customer routes
│   │   ├── index.js                    # Mounts all Express routes on server
│   │   ├── public.js                   # Public routes
│   │   ├── sync-all-inside-fork.js     # Sync all book chapters in forked process
│   │   ├── sync-one-inside-fork.js     # Sync single book chapter in forked process
│   ├── models                          # Mongoose models
│   │   ├── Book.js                     # Book model
│   │   ├── Chapter.js	                # Chapter model
│   │   ├── EmailTemplate.js            # Email Template model
│   │   ├── Purchase.js                 # Purchase model
│   │   ├── Review.js                   # Book Reviews model
│   │   ├── Tutorial.js                 # Tutorial model
│   │   ├── User.js                     # User model
│   ├── utils                           # Server-side util
│   │   ├──slugify.js                   # Generates slug for any Model
│   ├── app.js                          # Custom Express/Next server
│   ├── aws.js                          # AWS SES API
│   ├── github.js                       # Github API
│   ├── google.js                       # Google OAuth API
│   ├── logs.js                         # Logger
│   ├── mailchimp.js                    # MailChimp API
│   ├── routesWithCache.js              # Express routes with cache
│   ├── routesWithSlug.js               # Express routes that contain slug
│   ├── sitemapAndRobots.js             # Express routes for sitemap.xml and robots.txt
│   ├── stripe.js                       # Stripe API
├── static                              # Static resources
│   ├── robots.txt                      # Rules for search engine bots
├── test/server/utils                   # Tests
│   ├── slugify.test.js                 # Unit test for generateSlug() function
├── tutorials                           # Codebases for our tutorials
├── .eslintrc.js                        # Config for Eslint
├── .gitignore                          # List of ignored files and directories
├── .npmignore                          # Files and directories that are not uploaded to the server
├── now.json                            # Settings for now from Zeit
├── package.json                        # List of packages and scripts
├── yarn.lock                           # Exact versions of packages. Generated by yarn.

```
