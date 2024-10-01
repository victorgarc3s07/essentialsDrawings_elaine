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
 birth_date date
 );

create table carrinho (
id_img int,
id_pack int,
price_img decimal (5,2),
price_pack decimal (5,2)
);

 create table pedidos (
 id_pedido int primary key auto_increment,
 id_user int,
 id_img int,
 price_img decimal (5,2),
 id_pack int,
 price_pack decimal (5,2),
 price_total decimal (5,2),
 id_payment int
 );
 
 create table image (
 id_image int primary key auto_increment,
 name varchar(255),
 description varchar(5000),
 price decimal(5,2),
 id_categoria int
 );
 
 create table pack (
id_pack int primary key auto_increment,
name varchar(255),
description varchar(5000),
price decimal(5,2),
id_categoria int,
id_image1 int,
id_image2 int,
id_image3 int,
id_image4 int
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
 
alter table dados_user
add constraint fk_UserDados foreign key (id_user) references user (id);
 
ALTER TABLE dados_user
ADD COLUMN resPassToken VARCHAR(255) NULL,
ADD COLUMN resPassExpires DATETIME NULL; 

CREATE INDEX idx_pack_column ON pack(price);
CREATE INDEX idx_img_column ON image(price);

alter table carrinho
add constraint fk_ImgCart foreign key (id_img) references image (id_image),
add constraint fk_PackCart foreign key (id_pack) references pack (id_pack),
add constraint fk_PricePackcart foreign key (price_pack) references pack (price),
add constraint fk_PriceImgcart foreign key (price_img) references image (price);

 alter table pedidos
 add constraint fk_UserPedidos foreign key (id_user) references user (id),
 add constraint fk_ImgPedidos foreign key (id_img) references image (id_image),
 add constraint fk_PackPedidos foreign key (id_pack) references pack (id_pack),
 add constraint fk_PayPedidos foreign key (id_payment) references payment (id_payment),
 add constraint fk_CartImgPricePedidos foreign key (price_img) references carrinho (price_img),
 add constraint fk_CartPackPricePedidos foreign key (price_pack) references carrinho (price_pack);

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
CREATE TRIGGER del_category1
BEFORE DELETE ON categoria
FOR EACH ROW
BEGIN

	INSERT INTO dat_del_category (id_img, id_categoria)
	SELECT id_image, OLD.id_categoria
	FROM image
	WHERE id_categoria = OLD.id_categoria;

END //
DELIMITER ;

