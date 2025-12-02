--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-12-02 08:32:38

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
-- TOC entry 869 (class 1247 OID 16389)
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'Pendente',
    'Pago',
    'Cancelado'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

--
-- TOC entry 872 (class 1247 OID 16396)
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
-- TOC entry 217 (class 1259 OID 16403)
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
-- TOC entry 218 (class 1259 OID 16408)
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
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 219 (class 1259 OID 16409)
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
-- TOC entry 220 (class 1259 OID 16414)
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
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 220
-- Name: branches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.branches_id_seq OWNED BY public.branches.id;


--
-- TOC entry 221 (class 1259 OID 16415)
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
-- TOC entry 222 (class 1259 OID 16421)
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
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 222
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 223 (class 1259 OID 16422)
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
-- TOC entry 224 (class 1259 OID 16427)
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
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 224
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 225 (class 1259 OID 16428)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16433)
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
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 227 (class 1259 OID 16434)
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
-- TOC entry 228 (class 1259 OID 16439)
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
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 228
-- Name: feature_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feature_products_id_seq OWNED BY public.feature_products.id;


--
-- TOC entry 229 (class 1259 OID 16440)
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
-- TOC entry 230 (class 1259 OID 16443)
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
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 230
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 231 (class 1259 OID 16444)
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
-- TOC entry 232 (class 1259 OID 16452)
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
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 232
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 233 (class 1259 OID 16453)
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
-- TOC entry 234 (class 1259 OID 16458)
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
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 234
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 235 (class 1259 OID 16459)
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
-- TOC entry 236 (class 1259 OID 16466)
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
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 236
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 237 (class 1259 OID 16467)
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
-- TOC entry 238 (class 1259 OID 16474)
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
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 238
-- Name: user_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_addresses_id_seq OWNED BY public.user_addresses.id;


--
-- TOC entry 239 (class 1259 OID 16475)
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
-- TOC entry 240 (class 1259 OID 16480)
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
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4756 (class 2604 OID 16481)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 16482)
-- Name: branches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches ALTER COLUMN id SET DEFAULT nextval('public.branches_id_seq'::regclass);


--
-- TOC entry 4758 (class 2604 OID 16483)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 16484)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 16485)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 16486)
-- Name: feature_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products ALTER COLUMN id SET DEFAULT nextval('public.feature_products_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 16487)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 16488)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 16489)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 16490)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4773 (class 2604 OID 16491)
-- Name: user_addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses ALTER COLUMN id SET DEFAULT nextval('public.user_addresses_id_seq'::regclass);


--
-- TOC entry 4776 (class 2604 OID 16492)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4968 (class 0 OID 16403)
-- Dependencies: 217
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admin VALUES (1, 'Evelyn Oliveira', 'eveelynolliveira12300@gmail.com', '123456', 'a379f3b2504085c2901c2c5d3ef40f5e');
INSERT INTO public.admin VALUES (4, 'Laura Violla', 'lferreiraviolla@gmail.com', '123456', 'afef1f91e858e3b0b1e5be9522893474');
INSERT INTO public.admin VALUES (5, 'Alejandra Barros ', 'alejandra.barros@gmail.com', '123456', '000fb1d6a91ae3f7f2aaf467b890270c');
INSERT INTO public.admin VALUES (6, 'Giovanna Alba', 'albagomesg@gmail.com', '123456', '22f3c07b5bc87157db668dca74b8760d');
INSERT INTO public.admin VALUES (7, 'Bruna Savelli', 'bruna.savelli@gmail.com', '123456', 'fe5bcccf642dad5a2ea2079150655b2b');


--
-- TOC entry 4970 (class 0 OID 16409)
-- Dependencies: 219
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.branches VALUES (1, 'Espresso Stories - Belém', '66020-670', 'Rua Padre Champagnat', '45', 'Cidade Velha', 'Belém', 'PA', 'Próximo à Estação das Docas', NULL);
INSERT INTO public.branches VALUES (2, 'Espresso Stories - São Paulo', '04665-001', 'R. Flórida', '44', 'Brooklin', 'São Paulo', 'SP', 'Próximo à Estação das Docas', NULL);
INSERT INTO public.branches VALUES (3, 'Espresso Stories - Rio de Janeiro', '20021-140', 'Avenida Vieira Souto', '43', 'Ipanema', 'Rio de Janeiro', 'RJ', 'Próximo à Praia de Ipanema', 'Praia de Ipanema');
INSERT INTO public.branches VALUES (4, 'Espresso Stories - Caxias do Sul', '95020-360', 'Rua Sinimbu', '42', 'Centro', 'Caxias do Sul', 'RS', 'Região Comercial', 'Praça Dante Alighieri');
INSERT INTO public.branches VALUES (5, 'Espresso Stories -  Fortaleza', '60165-121', 'Avenida Beira Mar', '41', 'Meireles', ' Fortaleza', 'CE', 'Próximo à Feirinha da Beira Mar', 'Feirinha da Beira Mar');


--
-- TOC entry 4972 (class 0 OID 16415)
-- Dependencies: 221
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cart_items VALUES (1, 1, 4, NULL, 2, 20.00, 'Com Ketchup, por favor');


--
-- TOC entry 4974 (class 0 OID 16422)
-- Dependencies: 223
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carts VALUES (1, 1, 2, '2025-12-02 08:30:12.990859', '2025-12-02 08:30:12.990859');


--
-- TOC entry 4976 (class 0 OID 16428)
-- Dependencies: 225
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, 'Comidas Doces', 'Delícias em porções ideais para adoçar o dia sem culpa. De brigadeiros gourmets e cookies a mini tortinhas, cada item é uma pequena obra-prima de sabor.');
INSERT INTO public.categories VALUES (2, 'Comidas Salgadas', 'Aquele sabor que conforta e mata a fome de verdade. Aqui estão os favoritos de todos: coxinhas crocantes, croaissaints, sanduiche e pães de queijo fresquinhos. Ideais para um lanche rápido ou para acompanhar sua bebida.');
INSERT INTO public.categories VALUES (3, 'Bebidas Quentes', 'Perfeitas para um dia frio, um despertar ou um momento de pausa. Descubra nossos cafés aromáticos (do expresso intenso ao cappuccino cremoso), chás especiais e chocolates quentes inesquecíveis.');
INSERT INTO public.categories VALUES (4, 'Bebidas Geladas', 'Combata o calor com nossas bebidas geladas! Sucos naturais da fruta, sodas artesanais, chás gelados e vitaminas cremosas. A pedida certa para hidratar e revigorar o corpo.');


--
-- TOC entry 4978 (class 0 OID 16434)
-- Dependencies: 227
-- Data for Name: feature_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.feature_products VALUES (1, 2, 2, 'Tostada da Liberdade', '89d6e39c493deb7b5b54b73a2f3d6353', 'Pão sourdough tostado com creme de missô, queijo minas maçaricado e toque de cebolinha.', 24.00, '', NULL);
INSERT INTO public.feature_products VALUES (2, 2, 2, 'Mini Sanduíche Bixiga', '6d978d3304a57b2802ad88e268c1956e', 'Focaccia artesanal com mortadela trufada, rúcula baby e aioli de limão siciliano.', 28.00, '', NULL);
INSERT INTO public.feature_products VALUES (3, 2, 1, 'Brûlée de Café e Doce de Leite', '369d577068731dce955269a6bdb49f8a', 'Creme leve de café com camada crocante de açúcar caramelizado e doce de leite cremoso.', 19.00, '', NULL);
INSERT INTO public.feature_products VALUES (4, 2, 1, 'Cookie Brigadeiro Espresso', '38b3876569067292c9c4314b136faa44', 'Cookie artesanal de chocolate com recheio de brigadeiro cremoso e toque de espresso.', 13.00, '', NULL);
INSERT INTO public.feature_products VALUES (5, 2, 3, 'Latte Flor de Sal & Caramelo', '3c3ab6ede6f9ce62f9974c7b70f2fd3b', 'Espresso duplo com leite vaporizado e calda artesanal de caramelo com flor de sal.', 18.00, '', NULL);
INSERT INTO public.feature_products VALUES (6, 3, 1, 'Tigela Arpoador', 'b39d0db381d1efa0c0dc93cdbc16b0f8', 'Bowl de açaí com mousse de maracujá, coco fresco e nibs de cacau.', 27.00, '', NULL);
INSERT INTO public.feature_products VALUES (7, 3, 2, 'Croissant Copacabana', '4d611be698e415860930a903f9061881', 'Croissant amanteigado recheado com queijo minas fresco e geleia artesanal de abacaxi com hortelã.', 22.00, '', NULL);
INSERT INTO public.feature_products VALUES (8, 3, 2, 'Tosta Lapa', '213ca0988d64394638e841bd15753b3d', 'Pão artesanal com requeijão de castanha e redução de mel e cachaça.', 25.00, '', NULL);
INSERT INTO public.feature_products VALUES (9, 3, 1, 'Bolo Gengibre da Praia', '62dd765b5112d5f1a7ffc577aaa3ddae', 'Bolo leve de limão e gengibre com glacê de coco verde.', 16.00, '', NULL);
INSERT INTO public.feature_products VALUES (10, 3, 4, 'Cold Brew Tropical', 'ce002b644d839542e5a4d52efbf29b62', 'Café gelado extraído a frio, infusionado com manga e água de coco.', 17.00, '', NULL);
INSERT INTO public.feature_products VALUES (11, 4, 2, 'Panini da Vindima', 'da1e963472439b2511b38243872f3d48', 'Pão italiano grelhado com queijo colonial, uvas assadas e mel trufado.', 26.00, '', NULL);
INSERT INTO public.feature_products VALUES (12, 4, 1, 'Mini Torta de Nata e Vinho Tinto', 'fc195b5c2ef2c571782cac95d8376bbb', 'Torta cremosa de nata com toque de vinho tinto e frutas vermelhas.', 21.00, '', NULL);
INSERT INTO public.feature_products VALUES (13, 4, 3, 'Café Merlot', '22021453a010fe0453ca101fdbee6dce', 'Espresso com redução de vinho Merlot e espuma de leite.', 19.00, '', NULL);
INSERT INTO public.feature_products VALUES (14, 4, 2, 'Rissole de Funghi & Queijo Colonial', '4e524ee7f3a0650464e64ac9a67aa639', 'Espresso com redução de vinho Merlot e espuma de leite.', 23.00, '', NULL);
INSERT INTO public.feature_products VALUES (15, 4, 1, 'Cuca Crocante de Maçã Verde', 'e5180fcfc9565f463ab162a07568cafa', 'Massa fofa com cobertura crocante e toque de canela e maçã verde.', 17.00, '', NULL);
INSERT INTO public.feature_products VALUES (16, 5, 2, 'Tapioca Gourmet do Mucuripe', 'e57e55db9c3661daac737fa6acb58fe6', 'Tapioca recheada com camarões ao molho de coco e coentro fresco.', 27.00, '', NULL);
INSERT INTO public.feature_products VALUES (17, 5, 1, 'Bolo Gelado de Caju', '69fe042dfe76fed7b273f41537670218', 'Bolo molhadinho com calda de caju e cobertura de castanha crocante.', 18.00, '', NULL);
INSERT INTO public.feature_products VALUES (18, 5, 2, 'Sanduíche do Sol', '224943ae4add9da8eaa35b9e06492b76', 'Pão de mandioca com carne de sol desfiada e maionese de coentro.', 25.00, '', NULL);
INSERT INTO public.feature_products VALUES (19, 5, 3, 'Café Nordestino', '96460cb5e1810436855d90e43311273c', 'Espresso adoçado com rapadura artesanal e toque de canela.', 16.00, '', NULL);
INSERT INTO public.feature_products VALUES (20, 5, 1, 'Mousse de Cupuaçu e Chocolate Branco', '32f6e8fbfc36b4b8c341998a58ffd5ca', 'Mousse leve com equilíbrio entre acidez e doçura, finalizado com raspas de chocolate branco.', 19.00, '', NULL);
INSERT INTO public.feature_products VALUES (21, 1, 2, 'Pão de Açaí e Castanha-do-Pará', '28bf016667742dece36ecd598fd42ce7', 'Pão artesanal levemente adocicado, servido quente com manteiga de ervas amazônicas.', 22.00, '', NULL);
INSERT INTO public.feature_products VALUES (22, 1, 1, 'Cheesecake de Cupuaçu', '2c5498b9ea1ca6344fe16961defdab1a', 'Base crocante de castanha-do-pará com creme de cupuaçu e cobertura cítrica.', 20.00, '', NULL);
INSERT INTO public.feature_products VALUES (23, 1, 2, 'Empanada de Jambu e Queijo Coalho', '0a57bb7271a6235b54f38094498ac214', 'Massa dourada recheada com queijo coalho e jambu, com leve toque picante.', 24.00, '', NULL);
INSERT INTO public.feature_products VALUES (24, 1, 3, 'Cappuccino Amazônico', '7bac43a2549a464275c44e98478516ff', 'Espresso com leite vaporizado e calda de cacau 100% amazônico.', 18.00, '', NULL);
INSERT INTO public.feature_products VALUES (25, 1, 3, 'Tartelette de Taperebá', '861afcae697a429e15f1094cfeebfb87', 'Mini torta com creme de taperebá e chocolate meio amargo.', 21.00, '', NULL);


--
-- TOC entry 4980 (class 0 OID 16440)
-- Dependencies: 229
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_items VALUES (1, 1, NULL, 4, 2, 20.00);


--
-- TOC entry 4982 (class 0 OID 16444)
-- Dependencies: 231
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders VALUES (1, 1, 2, 1, '2025-12-02 08:30:27.34332', 'pix', 'Pendente', 'Pendente', 20.00, 'Entregar no portÆo da frente');


--
-- TOC entry 4984 (class 0 OID 16453)
-- Dependencies: 233
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
INSERT INTO public.products VALUES (22, 1, 'Cupcake da Lara Jean', '03a8400622970859bb805de1cb2693cd', 'Baunilha suave com cobertura de buttercream cremoso e confetes coloridos.', 12.00, 'Para Todos os Garotos que Já Amei – Jenny Han', 'beceba25fd7e3c920adac663dbd60860');
INSERT INTO public.products VALUES (23, 3, 'Pumpkin Spice Latte da Olive', 'cfc15915efc41a49fead7f7643b1fe81', 'Café cremoso com notas de abóbora, canela e noz-moscada, finalizado com chantilly suave.', 16.00, 'A Hipótese do Amor – Ali Hazelwood', 'c3c715a1733baedd5beb57fbd2128bc4');
INSERT INTO public.products VALUES (24, 1, 'Recomeço Doce', 'cc91c3cf86335c762364236fb61fca97', 'Massa amanteigada com recheio cremoso de limão e cobertura dourada de merengue.', 14.00, 'Sete Anos Entre Nós – Dani Atkins', 'e50e8f6df9d89b5524dc4989f383542e');
INSERT INTO public.products VALUES (25, 2, 'Queijo Quente do Jack', 'dd339e1da9c37ef4ac5738c1a105103a', 'Massa amanteigada com recheio cremoso de limão e cobertura dourada de merengue.', 18.00, 'Amor Teoricamente – Ali Hazelwood', '42df1882f578baec684cd12bab171c41');
INSERT INTO public.products VALUES (26, 4, 'Cerveja Amanteigada', 'a566e31a6ae403d2b2f00204a7a26663', 'Bebida cremosa e dourada com notas de caramelo e manteiga.', 20.00, 'Harry Potter e o Prisioneiro de Azkaban – J.K. Rowling', '55d1cedce1bc91190db638765bab91ee');
INSERT INTO public.products VALUES (27, 1, 'Amor & Gelato', '797f9facca063297841b7d61bfc6db20', 'Gelato artesanal de morango, baunilha e chocolate, cremoso e leve.', 16.00, 'Amor & Gelato – Jenna Evans Welch', '72abf0d29fa2ec5fb1c1664ee72b88df');
INSERT INTO public.products VALUES (28, 3, 'Chá Sereno da Summer', 'e76247418d34a8801039732a9e244658', 'Chá de camomila aromático, suave e calmante, servido com um toque de mel.', 12.00, 'Rota de Colisão – K. A. Tucker', 'dd4eabb5e5bacf119b324af13727d81f');
INSERT INTO public.products VALUES (29, 1, 'Brigadeiro da Vampira', '17d8c4c739f26c03551c21d7598bf630', 'Brigadeiro cremoso com pasta de amendoim e cobertura de paçoca.', 6.00, 'A Noiva – Ali Hazelwood', '3031aebef1a41bc0e759a9967e830627');
INSERT INTO public.products VALUES (30, 1, 'Cookies do Atlas', '2bc5fcd372f81a5c02ddafe765476ebc', 'Cookies caseiros de chocolate meio amargo com pedaços generosos de noz-pecã.', 8.00, 'É Assim que Acaba – Colleen Hoover', '748225a96e2b9db3bc7589b1acfa9422');
INSERT INTO public.products VALUES (31, 3, 'Café 221B Baker Street', '0217d5621573b72a8ce366568569a7bc', 'Café preto encorpado, com aroma intenso e torra média-escura.', 8.00, 'As Aventuras de Sherlock Holmes – Arthur Conan Doyle', '5fdcff6824ad5014fe37cf62d2860044');
INSERT INTO public.products VALUES (32, 1, 'Bombons Reais de Celaena', '6e2a3884320a20a744fc899fc2650b3b', 'Bombons de chocolate meio amargo com recheio de framboesa e toque de licor.', 8.00, 'Trono de Vidro – Sarah J. Maas', '7b3843863fd499a2b1099a130d085970');
INSERT INTO public.products VALUES (33, 1, 'Maçã Dourada de Elfhame', '5c184824da397af44b936a91dfcb0b28', 'Maçã caramelada coberta com calda dourada e leve toque de especiarias.', 14.00, 'O Príncipe Cruel – Holly Black', '4efb199ea069203ba00c131dae15db82');
INSERT INTO public.products VALUES (34, 4, 'Refresher Andarna', '897f1c389e61aea570a886c1df5a5a5a', 'Bebida dourada e cintilante feita com suco natural de maracujá, toque cítrico e glitter comestível', 16.00, 'Quarta Asa – Rebecca Yarros', '3c20a5ed3390c4f1823b0e1b82529640');
INSERT INTO public.products VALUES (35, 1, 'Panquecas Azuis do Acampamento Meio-Sangue', '945b2dd8a0fb64053c7db3f41d5064ae', 'Panquecas tingidas com corante natural azul e servidas com mel dos deuses e frutas silvestres.', 18.00, 'Percy Jackson e os Olimpianos – Rick Riordan', '562cf6c3a62272b114a4f537671bb470');
INSERT INTO public.products VALUES (36, 4, 'Refresher ‘Drink Me’', 'e1d5261ddf5fb4ddbf1493496fe1dc61', 'Bebida azul-violeta brilhante feita com blueberry, limonada e toque de hortelã. ', 15.00, 'Alice no País das Maravilhas – Lewis Carroll', '533467aba32b14f56a5a75d4cd463e76');
INSERT INTO public.products VALUES (37, 1, 'Sombra de Xaden', '9f212aad85dc8f329a2e65fb931e2ce7', 'Bolo de chocolate amargo com centro cremoso de ganache e cobertura aveludada de cacau. Finalizado com leve brilho metálico.', 20.00, 'Chama de Ferro – Rebecca Yarros', 'c9bc8818af2047f38df96fac429d54c2');
INSERT INTO public.products VALUES (38, 1, 'Bolo do Bruce', '07563f4281bb9536f9f9de376c0af895', 'Clássico bolo de chocolate ao leite, úmido e generoso, com camadas de cobertura cremosa e sabor intenso que desperta a nostalgia da cena mais icônica da escola Crunchem Hall.', 17.00, 'Matilda – Roald Dahl', 'fc73baae87715d4eeb499061b9262665');
INSERT INTO public.products VALUES (39, 1, 'Happy Birthday, Harry', '89816f6920b444488abf9ad0ff6b940e', 'Bolo de ninho com morangos frescos e chantilly leve, inspirado no primeiro aniversário que Harry realmente pôde celebrar. Decorado com cobertura rosa e letras verdes, como o bolo feito por Hagrid.', 19.00, 'Harry Potter e a Pedra Filosofal – J.K. Rowling', '1d01ae834a59b0fc00301f46b559da36');
INSERT INTO public.products VALUES (40, 1, 'Croissant Romeu e Julieta', '84a4385d2d7eee625f7d686e30b4db71', 'Clássico croissant folhado, recheado com queijo cremoso e goiabada derretid', 14.00, 'Romeu e Julieta – William Shakespeare', 'e8c8c7e432eabbcd02d85cc0ab4cfff4');
INSERT INTO public.products VALUES (41, 4, 'Refresco da Jenna', 'c5cf6166b464a42f7ca035f1f45f7bfb', 'Suco de maçã artesanal, dourado e delicadamente espumante.', 14.00, 'Uma Segunda Chance – Colleen Hoover', '741015ea638833d1b265dd44f26eaed0');
INSERT INTO public.products VALUES (42, 2, 'Sanduíche da Filó', '2eb52989b2ef24fab8c6403e07ca3e2c', 'Pão artesanal grelhado, recheado com queijo derretido, presunto defumado e folhas frescas.', 16.00, 'Divinos Rivais – Rebecca Ross', 'ec0be52ce7d219bb51dd0f5f2e378539');
INSERT INTO public.products VALUES (43, 1, 'Cakepop do Wes', '223d400a905989a7d93d2396101364fc', 'Bolo no palito com massa de baunilha e cobertura de chocolate branco, decorado como uma bola de beisebol.', 8.00, 'Não é Como nos Filmes – Lynn Painter', '97050f5aa174f04fc563c2c690963357');
INSERT INTO public.products VALUES (44, 1, 'Sticky Buns do Paxton', '28e784c619f9ccf37098375d23090787', 'Pãezinhos doces caramelizados, recheados com canela e noz-pecã, cobertos com uma calda dourada e pegajosa.', 15.00, 'Powerless – Lauren Roberts', '4e2392b78fd08be17684619f53d831b1');
INSERT INTO public.products VALUES (45, 2, 'Pão de Queijo ‘Melhor do que nos Filmes’', '2966a5d760ea108469addba6093f11dc', 'Pão de queijo mineiro, recheado com catupiry cremoso e pedaços crocantes de bacon.', 10.00, 'Melhor do que nos Filmes – Lynn Painter', 'ebd44296daa8862060c3ac2b74021c73');
INSERT INTO public.products VALUES (46, 2, 'Pão de Alho do Verão', '2f3c83b92e1c0c77454225feae7d3151', 'Pão artesanal assado na manteiga com alho dourado e ervas frescas.', 12.00, 'Até o Fim do Verão – Abby Jimenez', 'd9e3698ed5e247e4e3b7baa0e867acea');
INSERT INTO public.products VALUES (47, 1, 'Muffin do Lago Barry’s Bay', 'd968f9fa6b5656d514f2469c775e5263', 'Macio, levemente doce e repleto de blueberries frescas, esse muffin traz o sabor nostálgico dos verões em Barry’s Bay.', 18.00, 'Até o Verão Terminar – Collen Hoover', 'b690aea519cd5769ec96b42b1a3875f4');
INSERT INTO public.products VALUES (48, 1, 'Brownie da Sky', 'aa1ebdd94ba080ee9bd7b9a1397f629e', 'Brownie denso e macio, com casquinha crocante e centro cremoso de chocolate intenso.', 16.00, 'Sem Esperança – Colleen Hoover', 'd3fe4f427fc8677126992181ff859037');
INSERT INTO public.products VALUES (49, 1, 'Biscoito do Destino Imperfeito', '01fcddc2864a2be547e31119397efbcb', 'Biscoito da sorte crocante, com um creme de baunilha a parte suave e uma mensagem.', 9.00, 'Todas as Suas (Im)Perfeições – Colleen Hoover', '78f2441de01ba11be7e5072c5b001a08');
INSERT INTO public.products VALUES (50, 1, 'Biscoitos da Daisy', 'f62e0046ffedeb1f8dcd4a03ccc6095a', 'Biscoitos de gengibre com especiarias e um toque de mel, dourados e perfumados.', 12.00, 'Daisy Jones & The Six – Taylor Jenkins Reid', '0ca62dc314c9c4cee182c20525c258dd');
INSERT INTO public.products VALUES (51, 2, 'Croissant da Corte Noturna', 'd5e26851f31bf6c104632d11390f04a7', 'Croissant folhado e dourado, recheado com carne seca desfiada, requeijão cremoso e um toque de geleia de pimenta.', 18.00, 'Corte de Espinhos e Rosas (ACOTAR) – Sarah J. Maas', '7eeb7b568cd7e01f57cc2ee066ee9005');


--
-- TOC entry 4986 (class 0 OID 16459)
-- Dependencies: 235
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4988 (class 0 OID 16467)
-- Dependencies: 237
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_addresses VALUES (1, 1, '01310-000', 'Avenida Paulista', '1000', 'Bela Vista', 'SÆo Paulo', 'SP', 'Apto 45B', 'Pr¢ximo ao metr“ Trianon-Masp', true, '2025-12-02 08:30:05.535597');


--
-- TOC entry 4990 (class 0 OID 16475)
-- Dependencies: 239
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Rodrigo Silva', 'rodrigo.silva@example.com', '11987654321', '12345abc', NULL);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 7, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 220
-- Name: branches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branches_id_seq', 7, true);


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 222
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 224
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, true);


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 226
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 228
-- Name: feature_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feature_products_id_seq', 26, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 230
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 232
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, true);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 234
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 51, true);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 236
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 238
-- Name: user_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_addresses_id_seq', 1, true);


--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4779 (class 2606 OID 16494)
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- TOC entry 4781 (class 2606 OID 16496)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 16498)
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (id);


--
-- TOC entry 4785 (class 2606 OID 16500)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16502)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 16504)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 16506)
-- Name: feature_products feature_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_pkey PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 16508)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4795 (class 2606 OID 16510)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4797 (class 2606 OID 16512)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4799 (class 2606 OID 16514)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4801 (class 2606 OID 16516)
-- Name: user_addresses user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 4803 (class 2606 OID 16518)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4805 (class 2606 OID 16520)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4806 (class 2606 OID 16521)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 16526)
-- Name: cart_items cart_items_featured_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_featured_product_id_fkey FOREIGN KEY (featured_product_id) REFERENCES public.feature_products(id) ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 16531)
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4809 (class 2606 OID 16536)
-- Name: carts carts_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4810 (class 2606 OID 16541)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4811 (class 2606 OID 16546)
-- Name: feature_products feature_products_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4812 (class 2606 OID 16551)
-- Name: feature_products feature_products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feature_products
    ADD CONSTRAINT feature_products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4813 (class 2606 OID 16556)
-- Name: order_items order_items_featured_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_featured_product_id_fkey FOREIGN KEY (featured_product_id) REFERENCES public.feature_products(id) ON DELETE CASCADE;


--
-- TOC entry 4814 (class 2606 OID 16561)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 4815 (class 2606 OID 16566)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4816 (class 2606 OID 16571)
-- Name: orders orders_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id) ON DELETE CASCADE;


--
-- TOC entry 4817 (class 2606 OID 16576)
-- Name: orders orders_user_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_address_id_fkey FOREIGN KEY (user_address_id) REFERENCES public.user_addresses(id) ON DELETE CASCADE;


--
-- TOC entry 4818 (class 2606 OID 16581)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4819 (class 2606 OID 16586)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4820 (class 2606 OID 16591)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4821 (class 2606 OID 16596)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4822 (class 2606 OID 16601)
-- Name: user_addresses user_addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-12-02 08:32:39

--
-- PostgreSQL database dump complete
--

