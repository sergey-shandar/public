```mermaid
graph TD
    A(Person 1) -->|Facebook| B[Person 2]
    A -->|Facebook| C[Person 3]
    A -->|Facebook| D[Person 4]
    B -->|Facebook| C
    B -->|Facebook| D
    C -->|Facebook| D

    A -->|Twitter| E[Twitter]
    A -->|Instagram| F[Instagram]

    B -->|Snapchat| G[Snapchat]
    B -->|TikTok| H[TikTok]
    B -->|LinkedIn| I[LinkedIn]

    C -->|Instagram| F
    C -->|Pinterest| J[Pinterest]
    C -->|YouTube| K[YouTube]

    D -->|LinkedIn| I
    D -->|WhatsApp| L[WhatsApp]
    D -->|YouTube| K

    subgraph Shared Connections
        F
        I
        K
    end
```
