# AuroraTrace - Challenge FIAP 2025

---

## Visão Geral da Solução

Nossa solução é uma aplicação completa para gerenciar as motos dentro dos pátios da Mottu, controlando em que setor elas estão, seus status (Disponível, Manutenção, Ocupada) e seus eventos de entrada/saída.

A solução é composta por três repositórios principais:

| Repositório | Tecnologia | URL                                                                                   |
| :--- | :--- |:--------------------------------------------------------------------------------------|
| **Mobile App** | React Native/Expo | [Mobile](https://github.com/Challenge2025-Aurora/aurora-mobile)                       |
| **API Java** | Spring Boot | [Java](https://github.com/Challenge2025-Aurora/challenge2025-java) (Este Repositório) |
| **API C#** | .NET Core | [C#](https://github.com/Challenge2025-Aurora/aurora-cs)                               |

## Integrantes do Grupo

- **Felipe Prometti** - RM555174 - 2TDSPM
- **Maria Eduarda Pires** - RM558976 - 2TDSPZ
- **Samuel Damasceno** - RM558876 - 2TDSPM

## Tecnologias

- React Native com Expo
- TypeScript
- Firebase
- React Query (TanStack Query)
- AsyncStorage
- React Navigation
- i18n
- Expo Vector Icons
- Expo Camera, Image Picker, Location, Notifications & React Native Maps

## Funcionalidades

- Formulários com manipulação de estado e armazenamento
- Sistema de autenticação (login, cadastro, logout) com Firebase
- Navegação entre páginas e seções fluida (mais de 15 rotas)
- Tema claro/escuro e suporte a mais de dois idiomas

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/Challenge2025-Aurora/aurora-mobile.git
```

2. Instale as dependências:
```bash
cd aurora-mobile
npm install
```

3. Rode com Expo:
```bash
npx expo start
```

---