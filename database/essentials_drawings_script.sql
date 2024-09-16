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
 
 alter table dados_user
 add constraint fk_UserDados foreign key (id_user) references user (id);
 
 create table pedidos (
 id_pedido int primary key auto_increment,
 id_user int,
 id_img int,
 id_pack int,
 id_payment int
 );
 
 alter table pedidos
 add constraint fk_UserPedidos foreign key (id_user) references user (id),
 add constraint fk_ImgPedidos foreign key (id_img) references image (id_image),
 add constraint fk_PackPedidos foreign key (id_pack) references pack (id_pack),
 add constraint fk_PayPedidos foreign key (id_payment) references payment (id_payment);
 
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
 
 
 
 
 
 