# Azure AD Authentication Library for React/Next

_This is **not** an official microsoft package._

[![npm version](https://img.shields.io/npm/v/@null/azure-ad-react.svg?style=flat)](https://www.npmjs.com/package/@null/azure-ad-react/)
[![npm version](https://img.shields.io/npm/dm/@null/azure-ad-react.svg)](https://nodei.co/npm/@null/azure-ad-react/)

| [Getting Started](docs/getting-started.md) | <a href="https://www.npmjs.com/package/@null/azure-ad-react" target="blank">npm</a> | <a href="https://aka.ms/aaddevv2" target="_blank">Azure AD Docs</a> | <a href="https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev" target="_blank">Official msal Repo</a> |
| ------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |


1. [About](#about)
1. [Prerequisites](#prerequisites)
1. [Installation](#installation)
1. [Build and Test](#build-and-test)
1. [Usage](#usage)
   - [Getting Started](docs/getting-started.md)
1. [License](#license)

## About

`@null/azure-ad-react` is a powerful authentication library for React and Next.js applications that enables seamless integration with Azure Active Directory (Azure AD) for secure authentication and authorization workflows. The library utilizes the official Microsoft Authentication Library for React (MSAL React) and Microsoft Authentication Library for JavaScript (MSAL Browser) packages as peer dependencies, ensuring robust and reliable authentication capabilities.

### Key Features

- **Simplified Authentication:** `@null/azure-ad-react` aims to streamline the process of implementing Azure AD authentication in React/Next.js applications by abstracting away much of the complexity associated with the official MSAL packages. This allows developers to focus on building features rather than dealing with authentication intricacies.

- **Peer Dependency on Official MSAL Packages:** By relying on MSAL React and MSAL Browser as peer dependencies, @null/azure-ad-react ensures that it stays up-to-date with the latest Microsoft authentication standards and practices. This guarantees compatibility with Azure AD's evolving authentication protocols.

- **Effortless Configuration:** The library provides straightforward configuration options that make it easy to set up and customize Azure AD authentication for your application. With just a few lines of code, developers can establish a secure authentication flow tailored to their specific needs.

- **Reusable Components and Hooks:** `@null/azure-ad-react` exposes a set of reusable components and hooks that simplify authentication-related tasks. These components allow developers to easily create login, logout, and conditional rendering logic based on a user's authentication status or role.

### Why Choose @null/azure-ad-react?

Azure AD integration is a crucial aspect of building modern web applications that require secure user authentication and authorization. However, dealing with the intricacies of authentication protocols and token management can be daunting, especially for developers who are not well-versed in Azure AD.

`@null/azure-ad-react` addresses this challenge by providing a user-friendly and developer-centric approach to Azure AD authentication. Whether you are building a single-page application, a multi-page application, or a server-rendered application with Next.js, this library simplifies the process of adding Azure AD authentication, allowing you to focus on delivering exceptional user experiences.

## Prerequisites

Before you can start using @null/azure-ad-react to enable Azure AD authentication in your React or Next.js application, ensure you have met the following prerequisites:

1. **Client-Side Usage:**
   `@null/azure-ad-react` is designed to be used on the client side of your application.

1. **Azure AD App Registration:**
   To authenticate users with Azure AD, you need to register your application in the Azure AD portal. This registration process will provide you with a valid clientId that you will use for configuration. Follow the steps outlined in the [Azure AD Documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) to register your application and obtain the required clientId.

By fulfilling these prerequisites, you'll be ready to integrate `@null/azure-ad-react` seamlessly into your React or Next.js application and leverage the power of Azure AD authentication for enhanced security and user experiences.

## Installation

```bash
npm install @null/azure-ad-react
# or
yarn add @null/azure-ad-react
```

## Build and Test

See the [`contributing.md`](docs/contributing.md) file for more information.

### Building the package locally

To build the `@null/azure-ad-react` library, you can do the following:

```bash
# Install dev dependencies from root of repo
yarn

# To build the package
yarn build
```

### Running Tests

`@null/azure-ad-react` uses [jest](https://jestjs.io/) to run unit tests and coverage.

```bash
# To run tests
yarn test

# To run tests with code coverage
yarn test:coverage
```

## Usage

For help getting started with `@null/azure-ad-react` please see our [getting started](docs/getting-started.md) doc.

## License

Licensed under the[ MIT License](LICENSE).
