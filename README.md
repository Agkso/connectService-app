# 📱 ConnectService App (Mobile)

![React Native](https://img.shields.io/badge/React%20Native-0.7x-blue)
![Expo](https://img.shields.io/badge/Expo-Framework-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

Aplicativo mobile do **ConnectService**, permitindo que **prestadores** e **empregadores** interajam em tempo real para contratação de serviços.

---

# 📌 Sobre o Projeto

O app mobile tem como foco:

* 📲 mobilidade total
* ⚡ respostas rápidas
* 🔔 notificações em tempo real

Permitindo que o prestador aceite serviços rapidamente e o empregador acompanhe tudo direto pelo celular.

---

# 🧱 Arquitetura

Arquitetura baseada em separação de responsabilidades:

```id="d8f2k1"
Screens → Components → Hooks → Services → API
```

---

# 🛠️ Tecnologias Utilizadas

* React Native
* Expo
* TypeScript
* React Navigation
* React Query
* Axios
* Expo Notifications

---

# 📦 Estrutura do Projeto

```id="m3n9k2"
src/

screens/        → telas da aplicação
components/     → componentes reutilizáveis
hooks/          → hooks customizados
services/       → integração com API
navigation/     → rotas e navegação
store/          → estado global (se necessário)
utils/          → helpers
types/          → tipagens
```

---

# 🔁 Fluxo da Aplicação

```id="z7x6c5"
User → Screen → Hook → Service → API → Backend
```

---

# 📚 Funcionalidades

### 👤 Empregador

* Criar anúncios de serviço
* Visualizar prestadores disponíveis
* Acompanhar status em tempo real
* Avaliar prestadores

---

### 🧑‍🔧 Prestador

* Receber notificações instantâneas
* Aceitar ou recusar serviços
* Visualizar histórico
* Atualizar disponibilidade

---

### 🔔 Sistema

* Push notifications em tempo real
* Atualização de status do serviço
* Integração futura com WhatsApp

---

# ⚙️ Requisitos

* Node.js 18+
* Expo CLI
* Android Studio ou Xcode

---

# 🚀 Como rodar o projeto

### 1️⃣ Clonar repositório

```bash id="b2c3d4"
git clone https://github.com/seu-repo/connectservice-app.git
cd connectservice-app
```

---

### 2️⃣ Instalar dependências

```bash id="e5f6g7"
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Criar arquivo `.env`:

```env id="h8i9j0"
API_URL=http://localhost:8080
```

---

### 4️⃣ Rodar o app

```bash id="k1l2m3"
npx expo start
```

---

### 5️⃣ Executar no dispositivo

* 📱 Expo Go (Android/iOS)
* 🤖 Emulador Android
* 🍎 Simulador iOS

---

# 🔗 Integração com Backend

Comunicação com API via:

```id="n4o5p6"
Axios + React Query
```

Exemplo:

```typescript id="q7r8s9"
export const useGetJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await api.get("/jobs");
      return response.data;
    },
  });
};
```

---

# 🔔 Notificações

Uso de:

```id="t0u1v2"
Expo Notifications
```

Funcionalidades:

* Push em tempo real
* Aviso de novos serviços
* Atualização de status

---

# 🔐 Autenticação

* JWT
* Armazenamento seguro (AsyncStorage/SecureStore)
* Interceptadores Axios

---

# 🎨 UI/UX

* Interface mobile-first
* Design simples e direto
* Foco em rapidez de ação
* Feedback visual (loading, erro, sucesso)

---

# 🧠 Boas Práticas

* Componentização
* Hooks reutilizáveis
* Tipagem forte com TypeScript
* Separação de camadas
* Código limpo

---

# 🧭 Roadmap

* [ ] Login e cadastro
* [ ] Dashboard do prestador
* [ ] Dashboard do empregador
* [ ] Notificações push
* [ ] Geolocalização
* [ ] Chat em tempo real
* [ ] Integração com pagamentos

---

# 🤝 Contribuição

1. Fork o projeto
2. Criar branch (`feature/nova-feature`)
3. Commit (`git commit -m 'feat: nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Abrir Pull Request

---

# 📄 Licença

Este projeto está sob licença MIT.

---

# 💡 Observações

O app será peça chave do ecossistema e evoluirá para:

* experiência em tempo real
* alta performance
* integração com serviços externos
* possível versão offline-first

---

🔥 Projeto focado em experiência mobile e escala real.
