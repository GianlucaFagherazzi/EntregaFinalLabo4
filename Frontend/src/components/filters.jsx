import { useState, useEffect } from "react";
import { getCategories } from "../services/categoriesServices";

export default function Filters({ onFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        async function loadCategories() {
            const cats = await getCategories();
            setCategories(cats);
        }
        loadCategories();
    }, []);

    function apply() {
        const filters = {}

        if (categoryId) filters.categoryId = Number(categoryId)
        if (minPrice) filters.minPrice = Number(minPrice)
        if (maxPrice) filters.maxPrice = Number(maxPrice)

        onFilterChange(filters)
    }

    function clear() {
        setCategoryId("");
        setMinPrice("");
        setMaxPrice("");
        onFilterChange({});
    }


    return (
        <div className="sidebar-filters">
            <h3>Filtros</h3>

            <label>Categoría</label>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Todas</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <br />
            <label>Precio mínimo</label>
            <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <br />
            <label>Precio máximo</label>
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <br />
            <div className="filters-actions">
                <button className="btn" onClick={apply}>Aplicar</button>
                <button className="btn btn-secondary" onClick={clear}>Limpiar</button>
            </div>

        </div>
    );
}
