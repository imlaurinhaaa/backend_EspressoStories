--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-11-18 11:55:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 896 (class 1247 OID 16740)
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'Pendente',
    'Pago',
    'Cancelado'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

--
-- TOC entry 893 (class 1247 OID 16733)
-- Name: payment_method_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method_enum AS ENUM (
    'pix',
    'cartao',
    'dinheiro'
);


ALTER TYPE public.payment_method_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 240 (class 1259 OID 16818)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    photo character varying(255)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16817)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 239
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 222 (class 1259 OID 16638)
-- Name: branches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branches (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    cep character varying(9) NOT NULL,
    street character varying(255) NOT NULL,
    number character varying(20) NOT NULL,
    neighborhood character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(2) NOT NULL,
    complement text,
    reference_point text
);


ALTER TABLE public.branches OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16637)
-- Name: branches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.branches_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 221
-- Name: branches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.branches_id_seq OWNED BY public.branches.id;


--
-- TOC entry 232 (class 1259 OID 16708)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer,
    product_id integer,
    featured_product_id integer,
    quantity integer DEFAULT 1 NOT NULL,
    price numeric(10,2) NOT NULL,
    observations text
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16707)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 231
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 230 (class 1259 OID 16689)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer,
    branch_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16688)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 229
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 224 (class 1259 OID 16647)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16646)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 228 (class 1259 OID 16670)
-- Name: feature_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feature_products (
    id integer NOT NULL,
    branch_id integer,
    category_id integer,
    name character varying(255) NOT NULL,
    photo text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    inspiration text,
    photo_inspiration text
);


ALTER TABLE public.feature_products OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16669)
-- Name: feature_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feature_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feature_products_id_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 227
-- Name: feature_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feature_products_id_seq OWNED BY public.feature_products.id;


--
-- TOC entry 236 (class 1259 OID 16775)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    featured_product_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16774)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 234 (class 1259 OID 16748)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    branch_id integer,
    user_address_id integer,
    request_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    payment_method public.payment_method_enum NOT NULL,
    payment_status character varying(50) DEFAULT 'Pendente'::character varying,
    status public.order_status_enum DEFAULT 'Pendente'::public.order_status_enum,
    total_value numeric(10,2),
    observations text
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16747)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 233
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 226 (class 1259 OID 16656)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    category_id integer,
    name character varying(255) NOT NULL,
    photo text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    inspiration text,
    photo_inspiration text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16655)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 238 (class 1259 OID 16797)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    note integer,
    comments text,
    evaluation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_note_check CHECK (((note >= 1) AND (note <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16796)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 237
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 220 (class 1259 OID 16622)
-- Name: user_addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_addresses (
    id integer NOT NULL,
    user_id integer,
    cep character varying(9) NOT NULL,
    street character varying(255) NOT NULL,
    number character varying(20) NOT NULL,
    neighborhood character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(200) NOT NULL,
    complement text,
    reference_point text,
    is_default boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_addresses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16621)
-- Name: user_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_addresses_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_addresses_id_seq OWNED BY public.user_addresses.id;


--
-- TOC entry 218 (class 1259 OID 16611)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(13) NOT NULL,
    password_hash text NOT NULL,
    photo text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16610)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4823 (class 2604 OID 16821)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 16641)
-- Name: branches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches ALTER COLUMN id SET DEFAULT nextval('public.branches_id_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 16711)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 16692)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4808 (class 2604 OID 16650)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4810 (class 2604 OID 16673)
-- Name: feature_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products ALTER COLUMN id SET DEFAULT nextval('public.feature_products_id_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 16778)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 16751)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4809 (class 2604 OID 16659)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 16800)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4804 (class 2604 OID 16625)
-- Name: user_addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses ALTER COLUMN id SET DEFAULT nextval('public.user_addresses_id_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 16614)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5038 (class 0 OID 16818)
-- Dependencies: 240
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5020 (class 0 OID 16638)
-- Dependencies: 222
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.branches VALUES (1, 'Espresso Stories - Belém', '66020-670', 'Rua Padre Champagnat', '45', 'Cidade Velha', 'Belém', 'PA', 'Próximo à Estação das Docas', NULL);
INSERT INTO public.branches VALUES (2, 'Espresso Stories - São Paulo', '04665-001', 'R. Flórida', '44', 'Brooklin', 'São Paulo', 'SP', 'Próximo à Estação das Docas', NULL);
INSERT INTO public.branches VALUES (3, 'Espresso Stories - Rio de Janeiro', '20021-140', 'Avenida Vieira Souto', '43', 'Ipanema', 'Rio de Janeiro', 'RJ', 'Próximo à Praia de Ipanema', 'Praia de Ipanema');
INSERT INTO public.branches VALUES (4, 'Espresso Stories - Caxias do Sul', '95020-360', 'Rua Sinimbu', '42', 'Centro', 'Caxias do Sul', 'RS', 'Região Comercial', 'Praça Dante Alighieri');
INSERT INTO public.branches VALUES (5, 'Espresso Stories -  Fortaleza', '60165-121', 'Avenida Beira Mar', '41', 'Meireles', ' Fortaleza', 'CE', 'Próximo à Feirinha da Beira Mar', 'Feirinha da Beira Mar');


--
-- TOC entry 5030 (class 0 OID 16708)
-- Dependencies: 232
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5028 (class 0 OID 16689)
-- Dependencies: 230
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5022 (class 0 OID 16647)
-- Dependencies: 224
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, 'Comidas Doces', 'Delícias em porções ideais para adoçar o dia sem culpa. De brigadeiros gourmets e cookies a mini tortinhas, cada item é uma pequena obra-prima de sabor.');
INSERT INTO public.categories VALUES (2, 'Comidas Salgadas', 'Aquele sabor que conforta e mata a fome de verdade. Aqui estão os favoritos de todos: coxinhas crocantes, croaissaints, sanduiche e pães de queijo fresquinhos. Ideais para um lanche rápido ou para acompanhar sua bebida.');
INSERT INTO public.categories VALUES (3, 'Bebidas Quentes', 'Perfeitas para um dia frio, um despertar ou um momento de pausa. Descubra nossos cafés aromáticos (do expresso intenso ao cappuccino cremoso), chás especiais e chocolates quentes inesquecíveis.');
INSERT INTO public.categories VALUES (4, 'Bebidas Geladas', 'Combata o calor com nossas bebidas geladas! Sucos naturais da fruta, sodas artesanais, chás gelados e vitaminas cremosas. A pedida certa para hidratar e revigorar o corpo.');


--
-- TOC entry 5026 (class 0 OID 16670)
-- Dependencies: 228
-- Data for Name: feature_products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5034 (class 0 OID 16775)
-- Dependencies: 236
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5032 (class 0 OID 16748)
-- Dependencies: 234
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5024 (class 0 OID 16656)
-- Dependencies: 226
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (1, 2, 'Pão na Chapa', 'd276b7243cd652471297ad55b782a15d', 'Pão francês crocante, amanteigado e dourado na chapa até ficar levemente tostado.', 6.00, '', NULL);
INSERT INTO public.products VALUES (2, 2, 'Pão de Queijo', 'a9891dbae7e8ab078d40c3ff1130099e', 'Tradicional pão de queijo mineiro, crocante por fora e macio por dentro, feito com queijo artesanal e polvilho.', 5.00, '', NULL);
INSERT INTO public.products VALUES (3, 2, 'Croissant', '2e17dad73ecd194b5f57302350ba7195', 'Clássico croissant francês, leve e folhado, com manteiga.', 8.00, '', NULL);
INSERT INTO public.products VALUES (4, 2, 'Misto Quente', 'cbb54868d71428d95b44f1785794bdd2', 'Pão de forma tostado com queijo derretido e presunto fatiado.', 10.00, '', NULL);
INSERT INTO public.products VALUES (5, 1, 'Bolo de Cenoura', 'f5f7b80a158797e790f139b62fdf68c9', 'Clássico bolo caseiro de cenoura, fofinho e coberto com calda cremosa de chocolate.', 8.00, '', NULL);
INSERT INTO public.products VALUES (6, 2, 'Coxinha', 'fb99947571f975e119dc52e14a72dda9', 'Salgado frito, com massa macia e recheio suculento de frango desfiado e temperado.', 7.00, '', NULL);
INSERT INTO public.products VALUES (7, 2, 'Empada de Frango', 'e6bdfcbecae7f4f0203e3361b503c864', 'Massa leve e amanteigada, recheada com frango desfiado e temperos suaves.', 7.00, '', NULL);
INSERT INTO public.products VALUES (8, 2, 'Quiche', '8d93c7e9b30dca47c2e0b56872de28d9', 'Torta salgada com massa leve e amanteigada, recheada com creme de ovos, queijo e bacon.', 9.00, '', NULL);
INSERT INTO public.products VALUES (9, 1, 'Brigadeiro', 'baf111ac5f9d609e8f3a7b309ca223bb', 'Doce clássico brasileiro feito com leite condensado, chocolate e manteiga, enrolado e coberto com granulados.', 3.00, '', NULL);
INSERT INTO public.products VALUES (10, 1, 'Macaron de Framboesa', '7f367923a996885dc6770ca03dee0324', 'Doce francês delicado, com casquinha crocante e recheio de framboesa cremosa.', 6.00, '', NULL);
INSERT INTO public.products VALUES (11, 3, 'Café com Leite', 'd54709cac0835c2b0d0eb251de8c8793', 'Mistura equilibrada de café espresso e leite quente cremoso.', 7.00, '', NULL);
INSERT INTO public.products VALUES (12, 3, 'Cappuccino', '42b7c70e53f60571b00e15637e5b18a7', 'Bebida cremosa feita com café espresso, leite vaporizado e uma camada generosa de espuma, finalizada com toque de canela em pó.', 9.00, '', NULL);
INSERT INTO public.products VALUES (13, 3, 'Latte', '011ca9e18c68df83b102b3741661f026', 'Café espresso suave combinado com leite vaporizado e uma fina camada de espuma cremosa.', 8.00, '', NULL);
INSERT INTO public.products VALUES (14, 3, 'Chocolate Quente', 'eb6475aa40433b18a0a58bc6487379be', 'Bebida cremosa e encorpada feita com chocolate derretido e leite quente, finalizada com chantilly ou raspas de chocolate.', 10.00, '', NULL);
INSERT INTO public.products VALUES (15, 4, 'Suco de Laranja Natural', 'ef36261beb96c91b17a5d733df74ec62', 'Suco feito com laranjas frescas espremidas na hora, sem adição de açúcar.', 8.00, '', NULL);
INSERT INTO public.products VALUES (16, 4, 'Água Mineral sem Gás', 'd70cd5969dde580b7bbc943bea1fe28d', 'Água mineral natural, pura e refrescante.', 4.00, '', NULL);
INSERT INTO public.products VALUES (17, 4, 'Água Mineral com Gás', 'cb4221b1f200b4d3cddf4219563f4690', 'Água mineral gaseificada, leve e refrescante.', 5.00, '', NULL);
INSERT INTO public.products VALUES (18, 4, 'Coca-Cola', 'd1b60c4e3a32839b9123b46335c2d1a8', 'Refrigerante tradicional de sabor inconfundível, servido bem gelado para refrescar qualquer momento do dia.', 6.00, '', NULL);
INSERT INTO public.products VALUES (19, 4, 'Guaraná', '603c9ff2855b930d52fd3cf611a17578', 'Refrigerante brasileiro feito com extrato natural de guaraná, doce e refrescante, perfeito para acompanhar lanches e sobremesas.', 6.00, '', NULL);
INSERT INTO public.products VALUES (20, 4, 'Chá Gelado de Pêssego', '5742468a44355fd5927f0d8b55cb4d52', 'Bebida leve e refrescante, feita com chá preto e sabor suave de pêssego.', 7.00, '', NULL);


--
-- TOC entry 5036 (class 0 OID 16797)
-- Dependencies: 238
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5018 (class 0 OID 16622)
-- Dependencies: 220
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5016 (class 0 OID 16611)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 239
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, false);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 221
-- Name: branches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branches_id_seq', 7, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 231
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 229
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 227
-- Name: feature_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feature_products_id_seq', 1, false);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 233
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 21, true);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 237
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_addresses_id_seq', 1, false);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 4850 (class 2606 OID 16827)
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- TOC entry 4852 (class 2606 OID 16825)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4832 (class 2606 OID 16645)
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 16716)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 16696)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4834 (class 2606 OID 16654)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 16677)
-- Name: feature_products feature_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 16780)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 16758)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 16663)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 16806)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 16631)
-- Name: user_addresses user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 4826 (class 2606 OID 16620)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4828 (class 2606 OID 16618)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4859 (class 2606 OID 16717)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 16727)
-- Name: cart_items cart_items_featured_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_featured_product_id_fkey FOREIGN KEY (featured_product_id) REFERENCES public.feature_products(id) ON DELETE CASCADE;


--
-- TOC entry 4861 (class 2606 OID 16722)
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 16702)
-- Name: carts carts_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4858 (class 2606 OID 16697)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4855 (class 2606 OID 16678)
-- Name: feature_products feature_products_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4856 (class 2606 OID 16683)
-- Name: feature_products feature_products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4865 (class 2606 OID 16786)
-- Name: order_items order_items_featured_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_featured_product_id_fkey FOREIGN KEY (featured_product_id) REFERENCES public.feature_products(id) ON DELETE CASCADE;


--
-- TOC entry 4866 (class 2606 OID 16781)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 4867 (class 2606 OID 16791)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4862 (class 2606 OID 16764)
-- Name: orders orders_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4863 (class 2606 OID 16769)
-- Name: orders orders_user_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_address_id_fkey FOREIGN KEY (user_address_id) REFERENCES public.user_addresses(id) ON DELETE CASCADE;


--
-- TOC entry 4864 (class 2606 OID 16759)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4854 (class 2606 OID 16664)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4868 (class 2606 OID 16812)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4869 (class 2606 OID 16807)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4853 (class 2606 OID 16632)
-- Name: user_addresses user_addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-11-18 11:55:15

--
-- PostgreSQL database dump complete
--

