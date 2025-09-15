import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import styles from "./Calendar.module.css";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [viewMode, setViewMode] = useState('month'); 
    const [selectedCategory, setSelectedCategory] = useState('all');

    const sustainableEvents = [
        {
            id: 1,
            title: "Día Mundial del Medio Ambiente",
            date: new Date(2025, 5, 5), // 5 de junio 2025
            type: "mundial",
            category: "ambiental",
            description: "Fecha establecida por la ONU para sensibilizar sobre la protección del medio ambiente",
            icon: "🌍",
            color: "#0086f3ff",
            activities: ["Talleres de reciclaje", "Conferencias ambientales", "Actividades de reforestación"]
        },
        {
            id: 2,
            title: "Día de la Tierra",
            date: new Date(2025, 3, 22), // 22 de abril 2025
            type: "mundial",
            category: "ambiental",
            description: "Día internacional para crear conciencia sobre los problemas ambientales",
            icon: "🌎",
            color: "#0086f3ff",
            activities: ["Limpieza de espacios públicos", "Plantación de árboles", "Talleres de compostaje"]
        },
        {
            id: 3,
            title: "Día Mundial del Reciclaje",
            date: new Date(2025, 4, 17), // 17 de mayo 2025
            type: "mundial",
            category: "residuos",
            description: "Día para concienciar sobre la importancia del reciclaje",
            icon: "♻️",
            color: "#0086f3ff",
            activities: ["Talleres de reciclaje creativo", "Campañas de recolección", "Educación ambiental"]
        },
        {
            id: 4,
            title: "Día Mundial de la Alimentación",
            date: new Date(2025, 9, 16), // 16 de octubre 2025
            type: "mundial",
            category: "ambiental",
            description: "Día mundial para promover la seguridad alimentaria y la agricultura sostenible",
            icon: "🍎",
            color: "#0086f3ff",
            activities: ["Mercados orgánicos", "Talleres de alimentación consciente", "Compostaje doméstico"]
        },
        {
            id: 5,
            title: "Día Mundial del Agua",
            date: new Date(2025, 2, 22), // 22 de marzo 2025
            type: "mundial",
            category: "ambiental",
            description: "Día internacional para crear conciencia sobre la crisis mundial del agua",
            icon: "💧",
            color: "#0086f3ff",
            activities: ["Campañas de conservación", "Limpieza de ríos", "Educación sobre el recurso hídrico"]
        },
        {
            id: 6,
            title: "Semana de la Moda Sostenible Medellín",
            date: new Date(2025, 8, 20), // 20 de septiembre 2025
            type: "antioquia",
            category: "moda",
            description: "Evento anual de moda sostenible organizado en Medellín",
            icon: "👗",
            color: "#ff569dff",
            activities: ["Desfiles eco-friendly", "Talleres de upcycling", "Mercado de diseñadores locales"]
        },
        {
            id: 7,
            title: "Feria Verde del Jardín Botánico",
            date: new Date(2025, 4, 10), // 10 de mayo 2025
            type: "antioquia",
            category: "ambiental",
            description: "Feria de productos ecológicos y sostenibles en el Jardín Botánico de Medellín",
            icon: "🌿",
            color: "#ff569dff",
            activities: ["Venta de productos orgánicos", "Talleres ambientales", "Intercambio de semillas"]
        },
        {
            id: 8,
            title: "Festival de la Economía Circular Antioquia",
            date: new Date(2025, 10, 15), // 15 de noviembre 2025
            type: "antioquia",
            category: "residuos",
            description: "Festival departamental para promover la economía circular y la gestión de residuos",
            icon: "🔄",
            color: "#ff569dff",
            activities: ["Conferencias de innovación", "Exposición de empresas B", "Talleres de reutilización"]
        },
        {
            id: 9,
            title: "Día Internacional de los Bosques",
            date: new Date(2025, 2, 21), // 21 de marzo 2025
            type: "mundial",
            category: "ambiental",
            description: "Día para crear conciencia sobre la importancia de los bosques",
            icon: "🌲",
            color: "#ff569dff",
            activities: ["Reforestación comunitaria", "Educación forestal", "Conservación de especies nativas"]
        },
        {
            id: 10,
            title: "Mercado Campesino Sostenible",
            date: new Date(2025, 6, 12), // 12 de julio 2025
            type: "antioquia",
            category: "ambiental",
            description: "Mercado mensual de productos campesinos sostenibles en Medellín",
            icon: "🥕",
            color: "#ff569dff",
            activities: ["Venta directa del campo", "Talleres de agricultura orgánica", "Degustaciones locales"]
        }
    ];

    const categories = [
        { value: 'all', label: 'Todas las categorías', icon: '🌈' },
        { value: 'ambiental', label: 'Ambiental', icon: '🌱' },
        { value: 'moda', label: 'Moda Sostenible', icon: '👕' },
        { value: 'residuos', label: 'Gestión de Residuos', icon: '♻️' },
        { value: 'educativo', label: 'Educativo', icon: '📚' }
    ];

    const eventTypes = [
        { value: 'mundial', label: 'Día Mundial', color: '#0086f3ff' },
        { value: 'antioquia', label: 'Evento Antioquia', color: '#ff569dff' }
    ];


    const filteredEvents = selectedCategory === 'all'
        ? sustainableEvents
        : sustainableEvents.filter(event => event.category === selectedCategory);

    const getCurrentMonthEvents = () => {
        return filteredEvents.filter(event =>
            event.date.getMonth() === currentDate.getMonth() &&
            event.date.getFullYear() === currentDate.getFullYear()
        );
    };

    const getUpcomingEvents = () => {
        const now = new Date();
        return filteredEvents
            .filter(event => event.date >= now)
            .sort((a, b) => a.date - b.date)
            .slice(0, 5);
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            const dayEvents = filteredEvents.filter(event =>
                event.date.toDateString() === current.toDateString()
            );

            days.push({
                date: new Date(current),
                isCurrentMonth: current.getMonth() === month,
                isToday: current.toDateString() === new Date().toDateString(),
                events: dayEvents
            });

            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    return (
        <div className={styles.calendarPage}>
            <section className={styles.calendarHero}>
                <Container>
                    <Row className="text-center">
                        <Col>
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>
                                    <span className={styles.heroIcon}>🌍</span>
                                    Calendario Sostenible
                                </h1>
                                <p className={styles.heroSubtitle}>
                                    Descubre días mundiales y eventos de sostenibilidad en Antioquia relacionados con la economía circular
                                </p>
                                <div className={styles.heroStats}>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>{sustainableEvents.length}</span>
                                        <span className={styles.statLabel}>Eventos</span>
                                    </div>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>{getCurrentMonthEvents().length}</span>
                                        <span className={styles.statLabel}>Este Mes</span>
                                    </div>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>{getUpcomingEvents().length}</span>
                                        <span className={styles.statLabel}>Próximos</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={styles.calendarContent}>
                <Container>
                    <Row className="mb-4">
                        <Col lg={8}>
                            <div className={styles.calendarControls}>
                                <div className={styles.viewControls}>
                                    <Button
                                        className={`${styles.viewBtn} ${viewMode === 'month' ? styles.active : ''}`}
                                        onClick={() => setViewMode('month')}
                                    >
                                        📅 Vista Mensual
                                    </Button>
                                    <Button
                                        className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        📋 Vista Lista
                                    </Button>
                                </div>

                                <div className={styles.categoryFilter}>
                                    {categories.map(category => (
                                        <Button
                                            key={category.value}
                                            variant="outline-secondary"
                                            className={`${styles.categoryBtn} ${selectedCategory === category.value ? styles.categoryBtnActive : ''}`}
                                            onClick={() => setSelectedCategory(category.value)}
                                        >
                                            <span className={styles.categoryIcon}>{category.icon}</span>
                                            {category.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={8}>
                            {viewMode === 'month' ? (
                                <Card className={styles.calendarCard}>
                                    <Card.Header className={styles.calendarHeader}>
                                        <div className={styles.monthNavigation}>
                                            <Button className={styles.navBtn} onClick={handlePrevMonth}>
                                                ← Anterior
                                            </Button>
                                            <h3 className={styles.monthTitle}>
                                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                            </h3>
                                            <Button className={styles.navBtn} onClick={handleNextMonth}>
                                                Siguiente →
                                            </Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className={styles.calendarBody}>
                                        {/* Days Header */}
                                        <div className={styles.daysHeader}>
                                            {dayNames.map(day => (
                                                <div key={day} className={styles.dayName}>{day}</div>
                                            ))}
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className={styles.calendarGrid}>
                                            {generateCalendarDays().map((day, index) => (
                                                <div
                                                    key={index}
                                                    className={`${styles.calendarDay} 
                            ${!day.isCurrentMonth ? styles.otherMonth : ''} 
                            ${day.isToday ? styles.today : ''}`}
                                                >
                                                    <div className={styles.dayNumber}>{day.date.getDate()}</div>
                                                    <div className={styles.dayEvents}>
                                                        {day.events.map(event => (
                                                            <div
                                                                key={event.id}
                                                                className={styles.eventDot}
                                                                style={{ backgroundColor: event.color }}
                                                                onClick={() => handleEventClick(event)}
                                                                title={event.title}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <div className={styles.eventsListContainer}>
                                    <h3 className={styles.listTitle}>📋 Lista de Eventos</h3>
                                    <div className={styles.eventsList}>
                                        {filteredEvents.map(event => (
                                            <Card
                                                key={event.id}
                                                className={styles.eventCard}
                                                onClick={() => handleEventClick(event)}
                                            >
                                                <Card.Body className={styles.eventCardBody}>
                                                    <div className={styles.eventHeader}>
                                                        <div className={styles.eventIcon}>{event.icon}</div>
                                                        <div className={styles.eventInfo}>
                                                            <h4 className={styles.eventTitle}>{event.title}</h4>
                                                            <p className={styles.eventDate}>
                                                                📅 {event.date.toLocaleDateString('es-ES', {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            className={styles.eventTypeBadge}
                                                            style={{ backgroundColor: event.color }}
                                                        >
                                                            {eventTypes.find(type => type.value === event.type)?.label}
                                                        </Badge>
                                                    </div>
                                                    <p className={styles.eventDescription}>{event.description}</p>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Col>

                        {/* Sidebar */}
                        <Col lg={4}>
                            <div className={styles.sidebar}>

                                <Card className={styles.sidebarCard}>
                                    <Card.Header className={styles.sidebarHeader}>
                                        <h4>🏷️ Tipos de Eventos</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className={styles.legendList}>
                                            {eventTypes.map(type => (
                                                <div key={type.value} className={styles.legendItem}>
                                                    <div
                                                        className={styles.legendColor}
                                                        style={{ backgroundColor: type.color }}
                                                    />
                                                    <span className={styles.legendLabel}>{type.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>

                                { }
                                <Card className={styles.sidebarCard}>
                                    <Card.Header className={styles.sidebarHeader}>
                                        <h4>💡 Consejos Sostenibles</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className={styles.tipsList}>
                                            <div className={styles.tip}>
                                                <span className={styles.tipIcon}>🚰</span>
                                                <span>Reduce el consumo de agua cerrando la llave mientras te cepillas</span>
                                            </div>
                                            <div className={styles.tip}>
                                                <span className={styles.tipIcon}>💡</span>
                                                <span>Apaga las luces y desconecta aparatos que no estés usando</span>
                                            </div>
                                            <div className={styles.tip}>
                                                <span className={styles.tipIcon}>🛍️</span>
                                                <span>Usa bolsas reutilizables en lugar de plásticas</span>
                                            </div>
                                            <div className={styles.tip}>
                                                <span className={styles.tipIcon}>🌳</span>
                                                <span>Planta un árbol o cuida áreas verdes en tu comunidad</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Event Modal */}
            <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg">
                {selectedEvent && (
                    <>
                        <Modal.Header closeButton className={styles.modalHeader}>
                            <Modal.Title className={styles.modalTitle}>
                                <span className={styles.modalIcon}>{selectedEvent.icon}</span>
                                {selectedEvent.title}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={styles.modalBody}>
                            <div className={styles.modalContent}>
                                <div className={styles.modalInfo}>
                                    <p className={styles.modalDate}>
                                        📅 {selectedEvent.date.toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <Badge
                                        className={styles.modalBadge}
                                        style={{ backgroundColor: selectedEvent.color }}
                                    >
                                        {eventTypes.find(type => type.value === selectedEvent.type)?.label}
                                    </Badge>
                                </div>

                                <p className={styles.modalDescription}>{selectedEvent.description}</p>

                                <div className={styles.modalActivities}>
                                    <h5 className={styles.activitiesTitle}>🎯 Actividades Relacionadas:</h5>
                                    <ul className={styles.activitiesList}>
                                        {selectedEvent.activities.map((activity, index) => (
                                            <li key={index} className={styles.activityItem}>
                                                <span className={styles.activityBullet}>•</span>
                                                {activity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Calendar;