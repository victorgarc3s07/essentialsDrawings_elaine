 create database essentialsDrawing_db;
 -- drop database essentialsDrawing_db;
 use essentialsDrawing_db;
 
 create table user (
 id int primary key auto_increment,
 name varchar(255)
 );
 
 create table dados_user (
 id_user int primary key auto_increment,
 email varchar(255),
 password varchar(200),
 birth_date date,
 resPassToken VARCHAR(255) NULL,
 resPassExpires DATETIME NULL
 );
 
 create table image (
 id_image int primary key auto_increment,
 name varchar(255),
 description varchar(5000),
 id_categoria int,
 price decimal(5,2)
 );
 
 create table pack (
	id_pack int primary key auto_increment,
	name varchar(255),
	description varchar(5000),
	id_categoria int,
	id_image1 int,
	id_image2 int,
	id_image3 int,
	id_image4 int,
	price decimal(5,2)
 );
 
create table categoria (
id_categoria int primary key auto_increment,
name varchar(255),
description varchar(5000)
);

create table payment (
id_payment int primary key auto_increment,
name varchar(255)
);

CREATE TABLE dat_del_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    id_img INT,
    id_pack INT,
    data_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table employees (
id_employee int primary key auto_increment,
name varchar(255),
email varchar(255),
password varchar(255),
birth_date date,
position varchar(255),
resPassToken VARCHAR(255) NULL,
resPassExpires DATETIME NULL
);
 
alter table dados_user
add constraint fk_UserDados foreign key (id_user) references user (id);

 alter table image
 add constraint fk_CategImg foreign key (id_categoria) references categoria (id_categoria)
 on update cascade
on delete set null;
 alter table pack
 add constraint fk_CategPack foreign key (id_categoria) references categoria (id_categoria)
 on update cascade
on delete set null;
 
alter table pack
add constraint fk_Img1Pack foreign key (id_image1) references image (id_image),
add constraint fk_Img2Pack foreign key (id_image2) references image (id_image),
add constraint fk_Img3Pack foreign key (id_image3) references image (id_image),
add constraint fk_Img4Pack foreign key (id_image4) references image (id_image);

DELIMITER //
CREATE TRIGGER del_category
BEFORE DELETE ON categoria
FOR EACH ROW
BEGIN

	INSERT INTO dat_del_category (id_img, id_pack, id_categoria)
	SELECT image.id_image, pack.id_pack, OLD.id_categoria
	FROM pack
    JOIN image ON image.id_categoria = OLD.id_categoria
    WHERE image.id_categoria = OLD.id_categoria AND pack.id_categoria = OLD.id_categoria;

END //
DELIMITER ;

CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_img INT,
    id_pack INT,
    tipo ENUM('imagem', 'pack'),
    id_categoria INT,
    preco DECIMAL(10, 2),
    FOREIGN KEY (id_img) REFERENCES image(id_image),   -- Supondo que você tenha uma tabela `imagens`
	FOREIGN KEY (id_usuario) REFERENCES user(id),   -- Supondo que você tenha uma tabela `imagens`
    FOREIGN KEY (id_pack) REFERENCES pack(id_pack),      -- Supondo que você tenha uma tabela `packs`
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_payment INT,
    price_total DECIMAL(10, 2),
    FOREIGN KEY (id_usuario) REFERENCES user(id), -- Supondo que você tenha uma tabela `usuarios`
    FOREIGN KEY (id_payment) REFERENCES payment(id_payment)  -- Supondo que você tenha uma tabela `pagamentos`
);
CREATE TABLE itens_pedido (
    id_pedido INT,
    id_item INT,
    id_img INT,
    id_pack INT,
    id_categoria INT,
    preco DECIMAL(10, 2),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_img) REFERENCES image(id_image),   -- Supondo que você tenha uma tabela `imagens`
    FOREIGN KEY (id_pack) REFERENCES pack(id_pack),      -- Supondo que você tenha uma tabela `packs`
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) on update cascade on delete set null
);

-- DROP TRIGGER IF EXISTS del_category;

-- delete from categoria where id_categoria = 2;

