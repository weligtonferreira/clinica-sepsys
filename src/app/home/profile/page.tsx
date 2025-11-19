import Image from "next/image";

export default function UserProfilePage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <section className="bg-white shadow-md rounded-xl p-8 max-w-sm w-full flex flex-col items-center text-center">
                
                <Image
                    src="https://static.wikia.nocookie.net/famosos/images/8/87/Neymar_Foto_Oficial.jpg/revision/latest?cb=20231103144820&path-prefix=pt-br"
                    alt="Imagem do Neymar Jr"
                    width={300}
                    height={300}
                    className="rounded-full object-cover mb-6 shadow-sm"
                />

                <div className="mb-4">
                    <h1 className="text-gray-500 text-sm uppercase tracking-wide">Nome</h1>
                    <span className="text-xl font-semibold text-gray-800">Neymar Jr</span>
                </div>

                <div>
                    <h1 className="text-gray-500 text-sm uppercase tracking-wide">Email</h1>
                    <span className="text-lg text-gray-800">neymarsantosjr@gmail.com</span>
                </div>
            </section>
        </main>
    );
}
