const SUPABASE_URL = "https://adjrbgwnvagdqbqzfgwf.supabase.co";

const SUPABASE_KEY = "sb_publishable_YFkBbmCNye3C74aJuu7BcA_zmvSdRnT";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function protegerPagina() {
    const {
        data: { session },
        error
    } = await supabaseClient.auth.getSession();

    if (error || !session) {
        window.location.replace("login.html");
        return false;
    }

    return true;
}
