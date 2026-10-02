/* =====================================================
   CENTRALSAC - AUTENTICAÇÃO
===================================================== */

const CENTRAL_SAC_SUPABASE_URL = "https://adjrbgwnvagdqbqzfgwf.supabase.co";

const CENTRAL_SAC_SUPABASE_KEY =
  "sb_publishable_YFkBbmCNye3C74aJuu7BcA_zmvSdRnT";

/* =====================================================
   CRIAR CLIENTE SUPABASE
===================================================== */

if (!window.centralSACAuthClient) {
  window.centralSACAuthClient = window.supabase.createClient(
    CENTRAL_SAC_SUPABASE_URL,
    CENTRAL_SAC_SUPABASE_KEY,
    {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );
}

/* =====================================================
   VERIFICAR LOGIN
===================================================== */

async function protegerPagina() {
  try {
    const { data, error } = await window.centralSACAuthClient.auth.getSession();

    /* =============================================
           ERRO AO VERIFICAR
        ============================================= */

    if (error) {
      console.error("Erro ao verificar sessão:", error);

      window.location.replace("login.html");

      return;
    }

    /* =============================================
           NÃO ESTÁ LOGADO
        ============================================= */

    if (!data || !data.session) {
      window.location.replace("login.html");

      return;
    }

    /* =============================================
           ESTÁ LOGADO
        ============================================= */

    console.log("CentralSAC: usuário autenticado.", data.session.user.email);
  } catch (erro) {
    console.error("Erro inesperado na autenticação:", erro);

    window.location.replace("login.html");
  }
}

/* =====================================================
   EXECUTAR PROTEÇÃO SOMENTE NAS PÁGINAS DO PORTAL
===================================================== */

const caminhoAtual = window.location.pathname.toLowerCase();

if (!caminhoAtual.endsWith("/login.html") && !caminhoAtual.endsWith("/login")) {
  protegerPagina();
}
