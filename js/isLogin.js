export async function isLogin() {
    const req = {
        method: "GET",
        credentials: 'include'
    }
    try {
        const res = await fetch("https://fortunedgalab.xyz/isLogin", req)

        if (!res.ok) {
            alert(`${res.status} ${res.statusText}`)
            return {success:false}
        }
        alert("Succcessfully authenticated")
        return {success:true}
    } catch (e) {
        alert("Authentication error")
        return {success:false}
    }
}
