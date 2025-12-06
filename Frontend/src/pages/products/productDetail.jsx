import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/productsServices";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        load();
    }, [id]);

    async function load() {
        const data = await getProductById(id);
        setProduct(data);
    }

    if (!product) return <p>Cargando...</p>;

    return (
        <div>
            <h3>{product.name}</h3>
            <p>ID: {product.id}</p>
            <p>Precio: {product.price}</p>
        </div>
    );
}
