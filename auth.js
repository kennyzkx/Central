/* =====================================================
   CENTRALSAC - AUTENTICAÇÃO
===================================================== */

const CENTRAL_SAC_SUPABASE_URL =
    "https://adjrbgwnvagdqbqzfgwf.supabase.co";

const CENTRAL_SAC_SUPABASE_KEY =
    "sb_publishable_YFkBbmCNye3C74aJuu7BcA_zmvSdRnT";


/* =====================================================
   CRIA CLIENTE SUPABASE
===================================================== */

if (!window.centralSACAuthClient) {

    window.centralSACAuthClient =
        window.supabase.createClient(
            CENTRAL_SAC_SUPABASE_URL,
            CENTRAL_SAC_SUPABASE_KEY
        );

}


/* =====================================================
   PROTEGER PÁGINA
===================================================== */

async function protegerPagina() {

    try {

        const resposta =
            await window.centralSACAuthClient.auth.getSession();


        const session =
            resposta?.data?.session;


        const error =
            resposta?.error;


        /* ---------------------------------------------
           ERRO AO CONSULTAR SESSÃO
        --------------------------------------------- */

        if (error) {

            console.error(
                "Erro ao verificar sessão:",
                error
            );

            window.location.replace("login.html");

            return false;

        }


        /* ---------------------------------------------
           NÃO ESTÁ LOGADO
        --------------------------------------------- */

        if (!session) {

            window.location.replace("login.html");

            return false;

        }


        /* ---------------------------------------------
           ESTÁ LOGADO
        --------------------------------------------- */

        console.log(
            "CentralSAC: usuário autenticado."
        );


        return true;


    } catch (erro) {

        console.error(
            "Erro inesperado na autenticação:",
            erro
        );

        window.location.replace("login.html");

        return false;

    }

}
