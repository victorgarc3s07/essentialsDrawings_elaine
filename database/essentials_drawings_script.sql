 create database essentialsDrawing_db;

 use essentialsDrawing_db;
 
 create table user (
 id int primary key auto_increment,
 name varchar(255)
 );
 
 create table dados_user (
 id_user int primary key auto_increment,
 email varchar(255),
 password varchar(15),
 birth_date date
 );
 
alter table dados_user modify column password varchar(255);
 
alter table dados_user
add constraint fk_UserDados foreign key (id_user) references user (id);
 
ALTER TABLE dados_user
ADD COLUMN reset_password_token VARCHAR(255) NULL,
ADD COLUMN reset_password_expires DATETIME NULL; 

UPDATE `essentialsdrawing_db`.`dados_user` SET `email` = 'maria.e.lima73@aluno.senai.br' WHERE (`id_user` = '4');

create table carrinho (
id_img int,
id_pack int,
price_img decimal (5,2),
price_pack decimal (5,2),
price_total decimal (5,2)
);

alter table carrinho drop column price_total;

SHOW INDEX FROM pack;
SHOW INDEX FROM image;

CREATE INDEX idx_pack_column ON pack(price);
CREATE INDEX idx_img_column ON image(price);

alter table carrinho
add constraint fk_ImgCart foreign key (id_img) references image (id_image),
add constraint fk_PackCart foreign key (id_pack) references pack (id_pack),
add constraint fk_PricePackcart foreign key (price_pack) references pack (price),
add constraint fk_PriceImgcart foreign key (price_img) references image (price);

 create table pedidos (
 id_pedido int primary key auto_increment,
 id_user int,
 id_img int,
 id_pack int,
 id_payment int
 );
 
alter table pedidos
add column price_img decimal (5,2),
add column price_pack decimal (5,2),
add column price_total decimal (5,2);
 
 alter table pedidos
 add constraint fk_UserPedidos foreign key (id_user) references user (id),
 add constraint fk_ImgPedidos foreign key (id_img) references image (id_image),
 add constraint fk_PackPedidos foreign key (id_pack) references pack (id_pack),
 add constraint fk_PayPedidos foreign key (id_payment) references payment (id_payment);
 
 alter table pedidos
 add constraint fk_ImgPricepedidos foreign key (price_img) references image (price),
 add constraint fk_PackPricepedidos foreign key (price_pack) references pack (price);
 
 create table image (
 id_image int primary key auto_increment,
 name varchar(255),
 description varchar(5000),
 price decimal(5,2),
 id_categoria int
 );
 

 
 alter table image
 add constraint fk_CategImg foreign key (id_categoria) references categoria (id_categoria);
 
 create table pack (
id_pack int primary key auto_increment,
name varchar(255),
description varchar(5000),
price decimal(5,2),
id_image1 int,
id_image2 int,
id_image3 int,
id_image4 int
 );
 
 alter table pack add column category varchar(255);
 alter table pack rename column category to id_categoria;

alter table pack
add constraint fk_Img1Pack foreign key (id_image1) references image (id_image),
add constraint fk_Img2Pack foreign key (id_image2) references image (id_image),
add constraint fk_Img3Pack foreign key (id_image3) references image (id_image),
add constraint fk_Img4Pack foreign key (id_image4) references image (id_image);
 
create table categoria (
id_categoria int primary key auto_increment,
name varchar(255),
description varchar(5000)
);

create table payment (
id_payment int primary key auto_increment,
name varchar(255)
);
 
 create trigger antesDelCateg 
 before delete on categoria 
 for each row
 begin
 update image 
 set id_categoria = old.id_categoria 
 where id_categoria = old.id_categoria; 
 end;
 
 
 
 