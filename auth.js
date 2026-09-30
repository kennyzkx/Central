/* =========================================================
   CentralSAC — AUTENTICAÇÃO
========================================================= */

const CENTRALSAC_SUPABASE_URL =
    "https://adjrbgwnvagdqbqzfgwf.supabase.co";

const CENTRALSAC_SUPABASE_KEY =
    "sb_publishable_YFkBbmCNye3C74aJuu7BcA_zmvSdRnT";

/*
   Cria o cliente do Supabase somente uma vez.
*/
if (!window.centralSACAuthClient) {

    window.centralSACAuthClient =
        window.supabase.createClient(
            CENTRALSAC_SUPABASE_URL,
            CENTRALSAC_SUPABASE_KEY
        );

}


/* =========================================================
   PROTEGER PÁGINA
========================================================= */

async function protegerPagina() {

    try {

        const resposta =
            await window.centralSACAuthClient.auth.getSession();

        const session =
            resposta?.data?.session;

        const error =
            resposta?.error;


        /*
           Se houver erro na consulta,
           manda para o login.
        */

        if (error) {

            console.error(
                "Erro ao verificar sessão:",
                error
            );

            window.location.replace("login.html");

            return false;
        }


        /*
           Se não houver usuário logado,
           manda para o login.
        */

        if (!session) {

            window.location.replace("login.html");

            return false;
        }


        /*
           Usuário autenticado.
           A página permanece normalmente visível.
        */

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


/* =========================================================
   EXECUTAR PROTEÇÃO DEPOIS QUE A PÁGINA CARREGAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        protegerPagina();

    }
);
