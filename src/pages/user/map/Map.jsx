import { useState, useEffect, useRef } from "react";
import styles from "./Map.module.css";

const MapPage = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    // Datos de ubicaciones inventadas en Medellín y área metropolitana
    const locations = [
        // Tiendas de segunda mano
        {
            id: 1,
            name: "Vintage Medellín",
            type: "store",
            category: "Ropa vintage",
            description: "Tienda especializada en ropa vintage de alta calidad con piezas únicas de los años 60-90.",
            address: "Carrera 70 #45-23, El Poblado",
            phone: "+57 4 444-5678",
            email: "info@vintagemedell.com",
            instagram: "@vintagemedellín",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
            coordinates: { lat: 6.2088, lng: -75.5694 },
            hours: "Lun-Sab: 10:00 AM - 8:00 PM"
        },
        {
            id: 2,
            name: "EcoThrift Envigado",
            type: "store",
            category: "Ropa casual",
            description: "Amplia selección de ropa de segunda mano para toda la familia a precios accesibles.",
            address: "Calle 37 Sur #43-15, Envigado",
            phone: "+57 4 331-2345",
            email: "contacto@ecothrift.com",
            instagram: "@ecothriftenvigado",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400",
            coordinates: { lat: 6.1701, lng: -75.5937 },
            hours: "Mar-Dom: 9:00 AM - 7:00 PM"
        },
        {
            id: 3,
            name: "Closet Circular",
            type: "store",
            category: "Ropa diseñador",
            description: "Boutique de ropa de diseñador de segunda mano, piezas exclusivas y de marca.",
            address: "Carrera 35 #8A-120, Laureles",
            phone: "+57 4 250-8901",
            email: "hola@closetcircular.co",
            instagram: "@closetcircular",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400",
            coordinates: { lat: 6.2454, lng: -75.5904 },
            hours: "Lun-Vie: 10:00 AM - 7:00 PM, Sab: 10:00 AM - 6:00 PM"
        },
        // Organizaciones de donación
        {
            id: 4,
            name: "Fundación Vestir con Amor",
            type: "donation",
            category: "Organización benéfica",
            description: "Recibimos donaciones de ropa para redistribuir a familias en situación de vulnerabilidad.",
            address: "Calle 52 #68-40, Robledo",
            phone: "+57 4 423-7890",
            email: "donaciones@vestirconamor.org",
            instagram: "@vestirconamor",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
            coordinates: { lat: 6.2864, lng: -75.6240 },
            hours: "Lun-Vie: 8:00 AM - 5:00 PM"
        },
        {
            id: 5,
            name: "Centro de Acopio Verde",
            type: "donation",
            category: "Centro de acopio",
            description: "Punto de recolección de textiles para reciclaje y reutilización responsable.",
            address: "Carrera 48 #30-25, La Candelaria",
            phone: "+57 4 512-3456",
            email: "acopio@centroverde.org",
            instagram: "@centroverde",
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
            coordinates: { lat: 6.2442, lng: -75.5736 },
            hours: "Lun-Sab: 7:00 AM - 6:00 PM"
        },
        {
            id: 6,
            name: "Banco de Ropa Solidario",
            type: "donation",
            category: "Banco de ropa",
            description: "Banco de ropa que facilita el intercambio y donación entre la comunidad.",
            address: "Carrera 65 #98-15, Bello",
            phone: "+57 4 456-7890",
            email: "info@bancoropasol.com",
            instagram: "@bancoropasol",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            coordinates: { lat: 6.3370, lng: -75.5547 },
            hours: "Mar-Sab: 9:00 AM - 5:00 PM"
        },
        // Eventos y ferias
        {
            id: 7,
            name: "Feria Vintage Weekend",
            type: "event",
            category: "Feria mensual",
            description: "Feria mensual de ropa vintage, accesorios y artículos únicos todos los primeros sábados.",
            address: "Parque El Poblado, El Poblado",
            phone: "+57 301 234-5678",
            email: "info@feriavintagemde.com",
            instagram: "@feriavintagemde",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400",
            coordinates: { lat: 6.2110, lng: -75.5653 },
            hours: "Primer sábado del mes: 8:00 AM - 4:00 PM"
        },
        {
            id: 8,
            name: "Mercado Circular",
            type: "event",
            category: "Mercado sostenible",
            description: "Mercado quincenal enfocado en economía circular y moda sostenible.",
            address: "Plaza Mayor, Centro",
            phone: "+57 4 234-5678",
            email: "mercado@circularmde.co",
            instagram: "@mercadocircular",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400",
            coordinates: { lat: 6.2518, lng: -75.5636 },
            hours: "Cada 15 días (Sábados): 9:00 AM - 5:00 PM"
        },
        {
            id: 9,
            name: "Swap Party Medellín",
            type: "event",
            category: "Intercambio de ropa",
            description: "Eventos mensuales de intercambio de ropa donde puedes traer piezas y llevarte otras.",
            address: "Centro Cultural, Sabaneta",
            phone: "+57 300 987-6543",
            email: "swapparty@gmail.com",
            instagram: "@swappartymed",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
            coordinates: { lat: 6.1513, lng: -75.6164 },
            hours: "Último domingo del mes: 2:00 PM - 7:00 PM"
        },
        // Más tiendas
        {
            id: 10,
            name: "Preloved Boutique",
            type: "store",
            category: "Ropa premium",
            description: "Boutique especializada en ropa preloved de marcas premium y diseñadores reconocidos.",
            address: "Carrera 43A #1-50, El Poblado",
            phone: "+57 4 368-4590",
            email: "boutique@preloved.co",
            instagram: "@prelovedboutique",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            coordinates: { lat: 6.2015, lng: -75.5781 },
            hours: "Lun-Sab: 10:00 AM - 8:00 PM"
        }
    ];

    const filterOptions = [
        { key: 'all', label: 'Todos', count: locations.length, color: '#84A98C' },
        { key: 'store', label: 'Tiendas', count: locations.filter(l => l.type === 'store').length, color: '#52796F' },
        { key: 'donation', label: 'Donaciones', count: locations.filter(l => l.type === 'donation').length, color: '#CAD2C5' },
        { key: 'event', label: 'Eventos', count: locations.filter(l => l.type === 'event').length, color: '#87CEEB' }
    ];

    const getFilteredLocations = () => {
        if (activeFilter === 'all') return locations;
        return locations.filter(location => location.type === activeFilter);
    };

    const getMarkerIcon = (type) => {
        const colors = {
            store: '#52796F',
            donation: '#CAD2C5', 
            event: '#87CEEB'
        };
        
        const icons = {
            store: '🛍️',
            donation: '❤️',
            event: '📅'
        };

        return {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: colors[type],
            fillOpacity: 1,
            strokeColor: '#2F3E46',
            strokeWeight: 2,
            labelOrigin: new google.maps.Point(0, 0),
        };
    };

    const initializeMap = () => {
        if (!mapRef.current) return;

        const mapOptions = {
            center: { lat: 6.2442, lng: -75.5812 }, 
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ saturation: -5 }, { lightness: 20 }]
                },
                {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#CAD2C5" }]
                }
            ]
        };

        const newMap = new google.maps.Map(mapRef.current, mapOptions);
        setMap(newMap);
        setIsLoading(false);
    };

    const addMarkersToMap = (mapInstance) => {
        const filteredLocations = getFilteredLocations();
        
        if (mapInstance.markers) {
            mapInstance.markers.forEach(marker => marker.setMap(null));
        }
        mapInstance.markers = [];

        filteredLocations.forEach(location => {
            const marker = new google.maps.Marker({
                position: location.coordinates,
                map: mapInstance,
                title: location.name,
                icon: getMarkerIcon(location.type),
                label: {
                    text: location.type === 'store' ? '🛍️' : location.type === 'donation' ? '❤️' : '📅',
                    color: '#2F3E46',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="max-width: 280px; font-family: 'Inter', sans-serif;">
                        <div style="margin-bottom: 12px;">
                            <img src="${location.image}" alt="${location.name}" 
                                 style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
                        </div>
                        <h3 style="margin: 0 0 8px 0; color: #2F3E46; font-size: 16px;">${location.name}</h3>
                        <p style="margin: 0 0 8px 0; color: #52796F; font-size: 12px; font-weight: 600;">${location.category}</p>
                        <p style="margin: 0 0 12px 0; color: #354F52; font-size: 14px; line-height: 1.4;">${location.description}</p>
                        <div style="border-top: 1px solid #CAD2C5; padding-top: 12px; font-size: 13px;">
                            <p style="margin: 4px 0; color: #52796F;"><strong>📍</strong> ${location.address}</p>
                            <p style="margin: 4px 0; color: #52796F;"><strong>📞</strong> ${location.phone}</p>
                            <p style="margin: 4px 0; color: #52796F;"><strong>🕒</strong> ${location.hours}</p>
                            <p style="margin: 8px 0 4px 0; color: #52796F;"><strong>📱</strong> ${location.instagram}</p>
                        </div>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(mapInstance, marker);
                setSelectedLocation(location);
            });

            mapInstance.markers.push(marker);
        });
    };

    useEffect(() => {
        // Simular carga de Google Maps
        const timer = setTimeout(() => {
            window.google = {
                maps: {
                    Map: class {
                        constructor(element, options) {
                            this.element = element;
                            this.options = options;
                            this.markers = [];
                        }
                    },
                    Marker: class {
                        constructor(options) {
                            this.options = options;
                        }
                        setMap() {}
                        addListener() {}
                    },
                    InfoWindow: class {
                        constructor(options) {
                            this.options = options;
                        }
                        open() {}
                    },
                    SymbolPath: { CIRCLE: 0 },
                    Point: class {
                        constructor(x, y) {
                            this.x = x;
                            this.y = y;
                        }
                    }
                }
            };
            initializeMap();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (map) {
            addMarkersToMap(map);
        }
    }, [map, activeFilter]);

    const handleFilterChange = (filterKey) => {
        setActiveFilter(filterKey);
        setSelectedLocation(null);
    };

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        if (map) {
            map.setCenter(location.coordinates);
            map.setZoom(15);
        }
    };

    return (
        <div className={styles.mapPage}>
            <div className={styles.mapHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.pageTitle}>
                            <span className={styles.titleIcon}>📍</span>
                            Mapa EcoCloset
                        </h1>
                        <p className={styles.pageSubtitle}>
                            Descubre tiendas de segunda mano, puntos de donación y eventos de moda sostenible cerca de ti
                        </p>
                    </div>
                    
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Filtrar por:</h3>
                        <div className={styles.filterButtons}>
                            {filterOptions.map(option => (
                                <button
                                    key={option.key}
                                    onClick={() => handleFilterChange(option.key)}
                                    className={`${styles.filterBtn} ${activeFilter === option.key ? styles.active : ''}`}
                                    style={{ 
                                        '--filter-color': option.color,
                                        borderColor: activeFilter === option.key ? option.color : 'transparent'
                                    }}
                                >
                                    <span className={styles.filterLabel}>{option.label}</span>
                                    <span className={styles.filterCount}>{option.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.mapContainer}>
                <div className={styles.mapWrapper}>
                    <div 
                        ref={mapRef} 
                        className={styles.map}
                        style={{ 
                            background: isLoading ? 'linear-gradient(135deg, #CAD2C5, #84A98C)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isLoading && (
                            <div className={styles.mapLoader}>
                                <div className={styles.loader}></div>
                                <p className={styles.loadingText}>Cargando mapa...</p>
                                <p className={styles.loadingSubtext}>Conectando con Google Maps</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.sidePanel}>
                    <div className={styles.panelHeader}>
                        <h3 className={styles.panelTitle}>
                            Ubicaciones 
                            <span className={styles.locationCount}>
                                ({getFilteredLocations().length})
                            </span>
                        </h3>
                    </div>
                    
                    <div className={styles.locationsList}>
                        {getFilteredLocations().map(location => (
                            <div 
                                key={location.id}
                                onClick={() => handleLocationClick(location)}
                                className={`${styles.locationCard} ${selectedLocation?.id === location.id ? styles.selected : ''}`}
                            >
                                <div className={styles.locationImage}>
                                    <img src={location.image} alt={location.name} />
                                    <div className={`${styles.locationBadge} ${styles[location.type]}`}>
                                        {location.type === 'store' ? '🛍️' : location.type === 'donation' ? '❤️' : '📅'}
                                    </div>
                                </div>
                                
                                <div className={styles.locationInfo}>
                                    <h4 className={styles.locationName}>{location.name}</h4>
                                    <p className={styles.locationCategory}>{location.category}</p>
                                    <p className={styles.locationAddress}>📍 {location.address}</p>
                                    <p className={styles.locationHours}>🕒 {location.hours}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;