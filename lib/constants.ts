export const DEFAULT_YAML = `openapi: 3.0.0
info:
  title: Sample API
  description: A sample API to demonstrate Zagger YAML Previewer.
  version: 1.0.0
servers:
  - url: http://api.example.com/v1
    description: Production server
paths:
  /hello:
    get:
      summary: Returns a greeting
      responses:
        '200':
          description: A JSON greeting
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: "Hello, World!"
`;
