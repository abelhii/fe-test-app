# EXADS Frontend Test Project

## Abel's Submission

The general approach to create a scalable application was to create a component driven architecture as outlined below.

This approach splits reuseable components (`app/lib`) into their own modules and having business features (`app/user`) as separate modules that consume these reuseable modules.

While this creates more files overall, it makes each component easier to maintain, test and simplifies the code needed to reuse these components. <br>
It also introduces possibilities of including design library tools (like Storybook) to help manage and flesh out a proper design system.

## File structure

- /app
  - /lib (component library / design system)
    - /table
      - /table-controls
        - table-controls.component
      - table.component (wrapper for custom ngx-datatable)
  - /users (business feature/page)
    - /add-new-users
      - add-new-user.component (Add user form)
    - user.component (container for table and table-controls)

## Data consumption

Data is consumed via the business feature components (`users.component`) using a service to separate the API calls to the server, making it easier to test the component.

## i18n

I setup grounds for internationalization by setting labels and text in template into the following format `{{ "USER" }}`, so that it will be easy to find and replace with a key and add a `| translate` pipe.
<br>
For the labels defined in the `.ts` classes, it requires a translate service and binding keys to those labels.

---

This project is intended to be used as a base for the EXADS Frontend Test. It includes:

- Empty Angular 8 app with required dependencies for Angular Material and Ngx Datatable already set up.
- API to support the frontend app.

## Getting started

### Prerequisites

- Node 12+

### Set up

1. Clone this repo using your preferred method.
2. Install apps dependencies.

```
$ npm install
```

3. Run the Angular app. By default it will run in `http://localhost:4200`

```
$ npm start
```

4. Run the API app. By default it will run in `http://localhost:3000`

```
$ npm run start-api
```

## Need more help?

- Angular Material: see https://material.angular.io/
- ngx-datatable: see https://github.com/swimlane/ngx-datatable
- API docs: see https://documenter.getpostman.com/view/11918524/TzRNFAPs
