import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./Forum.module.css";

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        category: "Discussion"
    });

    // Datos de ejemplo de posts del foro
    const forumPosts = [
        {
            id: 1,
            title: "I want to start growing my own vegetables, how do I start?",
            content: "I've been reading some of the benefits of growing your own vegetables, and I...",
            author: "Coast to Coast",
            avatar: "🌱",
            category: "Discussion",
            timeAgo: "14m ago",
            comments: 2,
            likes: 0,
            isLiked: false,
            tags: ["vegetables", "beginner", "gardening"]
        },
        {
            id: 2,
            title: "My garden is my Eden.",
            content: "I have to say, I love gardening. It has become a blossoming love for me ove...",
            author: "Coast to Coast",
            avatar: "🌻",
            category: "Discussion",
            timeAgo: "14m ago",
            comments: 1,
            likes: 1,
            isLiked: true,
            tags: ["gardening", "love", "passion"]
        },
        {
            id: 3,
            title: "Tips for seeding grass",
            content: "Start by loosening the top of the soil about 2/3 inches and clearing the area...",
            author: "Coast to Coast",
            avatar: "🌿",
            category: "Discussion",
            timeAgo: "14m ago",
            comments: 3,
            likes: 0,
            isLiked: false,
            tags: ["grass", "seeding", "tips"]
        },
        {
            id: 4,
            title: "¿Dónde encontrar ropa de segunda mano de calidad?",
            content: "Hola comunidad! Estoy buscando recomendaciones de tiendas confiables en Medellín...",
            author: "EcoLover",
            avatar: "♻️",
            category: "Recommendations",
            timeAgo: "1h ago",
            comments: 8,
            likes: 12,
            isLiked: false,
            tags: ["segunda-mano", "medellín", "calidad"]
        },
        {
            id: 5,
            title: "Evento de intercambio de ropa este fin de semana",
            content: "¡Hola eco-warriors! Les comparto que este sábado habrá un evento de intercambio...",
            author: "GreenFashion",
            avatar: "👗",
            category: "Events",
            timeAgo: "2h ago",
            comments: 15,
            likes: 25,
            isLiked: true,
            tags: ["evento", "intercambio", "weekend"]
        },
        {
            id: 6,
            title: "Tutorial: Cómo renovar prendas vintage",
            content: "Paso a paso para darle nueva vida a esas piezas únicas que encontramos en mercados...",
            author: "VintageQueen",
            avatar: "✨",
            category: "Tutorials",
            timeAgo: "4h ago",
            comments: 7,
            likes: 18,
            isLiked: false,
            tags: ["tutorial", "vintage", "DIY"]
        }
    ];

    const categories = [
        { value: "all", label: "Todas las categorías", icon: "🌍" },
        { value: "Discussion", label: "Discusiones", icon: "💭" },
        { value: "Recommendations", label: "Recomendaciones", icon: "⭐" },
        { value: "Events", label: "Eventos", icon: "📅" },
        { value: "Tutorials", label: "Tutoriales", icon: "📚" }
    ];

    useEffect(() => {
        setPosts(forumPosts);
    }, []);

    const handleLike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1
                    }
                    : post
            )
        );
    };

    const filteredPosts = selectedCategory === "all"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const handleNewPostSubmit = (e) => {
        e.preventDefault();
        if (newPost.title && newPost.content) {
            const post = {
                id: posts.length + 1,
                title: newPost.title,
                content: newPost.content,
                author: "Usuario Actual",
                avatar: "🙋‍♀️",
                category: newPost.category,
                timeAgo: "ahora",
                comments: 0,
                likes: 0,
                isLiked: false,
                tags: []
            };
            setPosts([post, ...posts]);
            setNewPost({ title: "", content: "", category: "Discussion" });
            setShowNewPost(false);
        }
    };

    return (
        <div className={styles.forumPage}>
            {/* Hero Section */}
            <section className={styles.forumHero}>
                <Container>
                    <Row className="text-center">
                        <Col>
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>
                                    <span className={styles.heroIcon}>💬</span>
                                    Foro de la Comunidad EcoCloset
                                </h1>
                                <p className={styles.heroSubtitle}>
                                    Comparte experiencias, consejos y conecta con otros amantes de la moda sostenible
                                </p>
                                <div className={styles.heroStats}>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>20+</span>
                                        <span className={styles.statLabel}>Miembros</span>
                                    </div>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>30+</span>
                                        <span className={styles.statLabel}>Discusiones</span>
                                    </div>
                                    <div className={styles.heroStat}>
                                        <span className={styles.statNumber}>50+</span>
                                        <span className={styles.statLabel}>Respuestas</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Main Forum Content */}
            <section className={styles.forumContent}>
                <Container>
                    {/* Forum Controls */}
                    <Row className="mb-4">
                        <Col lg={8}>
                            <div className={styles.forumControls}>
                                <h2 className={styles.sectionTitle}>Nuevos Posts</h2>
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
                        <Col lg={4} className="text-lg-end">
                            <Button
                                className={styles.newPostBtn}
                                onClick={() => setShowNewPost(!showNewPost)}
                            >
                                <span className={styles.btnIcon}>✏️</span>
                                Crear Nuevo Post
                            </Button>
                        </Col>
                    </Row>

                    {/* New Post Form */}
                    {showNewPost && (
                        <Row className="mb-5">
                            <Col lg={8}>
                                <Card className={styles.newPostCard}>
                                    <Card.Header className={styles.newPostHeader}>
                                        <h4>✨ Crear Nuevo Post</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handleNewPostSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className={styles.formLabel}>Título</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="¿Cuál es tu pregunta o tema?"
                                                    value={newPost.title}
                                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                                    className={styles.formInput}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className={styles.formLabel}>Categoría</Form.Label>
                                                <Form.Select
                                                    value={newPost.category}
                                                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                                    className={styles.formSelect}
                                                >
                                                    <option value="Discussion">💭 Discusión</option>
                                                    <option value="Recommendations">⭐ Recomendación</option>
                                                    <option value="Events">📅 Evento</option>
                                                    <option value="Tutorials">📚 Tutorial</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Label className={styles.formLabel}>Contenido</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    placeholder="Comparte tus ideas, experiencias o preguntas..."
                                                    value={newPost.content}
                                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                                    className={styles.formTextarea}
                                                />
                                            </Form.Group>
                                            <div className={styles.newPostActions}>
                                                <Button
                                                    variant="outline-secondary"
                                                    onClick={() => setShowNewPost(false)}
                                                    className={styles.cancelBtn}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className={styles.publishBtn}
                                                >
                                                    <span className={styles.btnIcon}>🚀</span>
                                                    Publicar Post
                                                </Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    {/* Forum Posts Grid */}
                    <Row>
                        <Col lg={8}>
                            <div className={styles.postsGrid}>
                                {filteredPosts.map((post, index) => (
                                    <Card key={post.id} className={`${styles.postCard} ${styles.fadeInUp}`}
                                        style={{ animationDelay: `${index * 0.1}s` }}>
                                        <Card.Body className={styles.postCardBody}>
                                            {/* Post Header */}
                                            <div className={styles.postHeader}>
                                                <div className={styles.postAuthor}>
                                                    <div className={styles.authorAvatar}>{post.avatar}</div>
                                                    <div className={styles.authorInfo}>
                                                        <div className={styles.authorName}>{post.author}</div>
                                                        <div className={styles.postTime}>🕒 {post.timeAgo}</div>
                                                    </div>
                                                </div>
                                                <span className={styles.categoryBadge}>
                                                    {categories.find(cat => cat.value === post.category)?.icon} {post.category}
                                                </span>
                                            </div>

                                            {/* Post Content */}
                                            <div className={styles.postContent}>
                                                <h3 className={styles.postTitle}>{post.title}</h3>
                                                <p className={styles.postText}>{post.content}</p>

                                                {/* Tags */}
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className={styles.postTags}>
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className={styles.tag}>#{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Post Actions */}
                                            <div className={styles.postActions}>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.commentBtn}`}
                                                    onClick={() => { }}
                                                >
                                                    <span className={styles.actionIcon}>💬</span>
                                                    <span className={styles.actionCount}>{post.comments}</span>
                                                </button>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.likeBtn} ${post.isLiked ? styles.liked : ''}`}
                                                    onClick={() => handleLike(post.id)}
                                                >
                                                    <span className={styles.actionIcon}>{post.isLiked ? '❤️' : '🤍'}</span>
                                                    <span className={styles.actionCount}>{post.likes}</span>
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>

                            {/* Load More Button */}
                            <div className="text-center mt-5">
                                <Button className={styles.loadMoreBtn}>
                                    <span className={styles.btnIcon}>⬇️</span>
                                    Cargar más posts
                                </Button>
                            </div>
                        </Col>

                        {/* Sidebar */}
                        <Col lg={4}>
                            <div className={styles.sidebar}>
                                {/* Community Guidelines */}
                                <Card className={styles.sidebarCard}>
                                    <Card.Header className={styles.sidebarHeader}>
                                        <h4>📋 Normas de la Comunidad</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className={styles.guidelinesList}>
                                            <div className={styles.guideline}>
                                                <span className={styles.guidelineIcon}>🤝</span>
                                                <span>Sé respetuoso con otros miembros</span>
                                            </div>
                                            <div className={styles.guideline}>
                                                <span className={styles.guidelineIcon}>🌱</span>
                                                <span>Mantén el foco en sostenibilidad</span>
                                            </div>
                                            <div className={styles.guideline}>
                                                <span className={styles.guidelineIcon}>📸</span>
                                                <span>Comparte fotos de calidad</span>
                                            </div>
                                            <div className={styles.guideline}>
                                                <span className={styles.guidelineIcon}>🚫</span>
                                                <span>No spam o autopromoción</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Forum;