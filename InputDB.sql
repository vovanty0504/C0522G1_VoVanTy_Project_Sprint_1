create database if not exists project_module_6_v5;

use project_module_6_v5;

create table if not exists promotion(
	id int primary key auto_increment,
	name varchar(100),
	is_delete bit default 0,
	image text,
	start_time varchar(50),
	end_time varchar(50),
	detail text,
	discount int
);

create table if not exists user(
	username varchar(30) primary key,
    password varchar(200),
    is_delete bit default 0
);

create table  if not exists role(
	id int primary key auto_increment,
    name varchar(30),
    is_delete bit default 0
);

create table if not exists user_role(
	username varchar(50),
    role_id int,
    is_delete bit default 0,
    foreign key(username) references user(username),
    foreign key(role_id) references role(id),
    primary key(username, role_id)
);

create table if not exists customer_type(
	id int primary key auto_increment,
    name varchar(30),
    is_delete bit default 0
);

create table if not exists customer(
	id int primary key auto_increment,
	name varchar(30),
	is_delete bit default 0,
	day_of_birth varchar(30),
	gender int,
	id_card varchar(12),
	email varchar(100),
	address varchar(200),
	phone_number varchar(15),
	username varchar(30) unique,
	customer_type_id int,
	foreign key (username) references user(username),
	foreign key (customer_type_id) references customer_type(id)
);

create table if not exists saving_point(
	id int primary key auto_increment,
	point int,
    content varchar(100),
	day_booking datetime,
	customer_id int,
	foreign key(customer_id) references customer(id)
);

create table if not exists employee(
	id int primary key auto_increment,
	name varchar(50),
	gender int,
	email varchar(100),
	address varchar(200),
	phone_number varchar(15),
	username varchar(30) unique,
	id_card varchar(12),
	day_of_birth varchar(30),
	image varchar(500),
	is_delete bit default 0,
	foreign key (username) references user(username)
);

create table if not exists movie_type(
	id int primary key auto_increment,
	name varchar(50),
	is_delete bit default 0
);

create table if not exists movie(
	id int primary key auto_increment,
	name text,
	is_delete bit default 0,
	image text,
	start_day varchar(100),
	end_day varchar(100),
	director varchar(50),
	film_time int,
	trailer text,
	movie_type_id int,
	content text,
	film_studio varchar(50),
	actor text,
	version int,
	foreign key(movie_type_id) references movie_type(id),
    employee_id int,
    foreign key (employee_id) references employee(id)
);

-- create table if not exists promotion_detail(
-- 	id int primary key auto_increment,
--     promotion_id int,
--     foreign key(promotion_id) references promotion(id),
--     customer_type_id int ,
--     foreign key(customer_type_id) references customer_type(id),
--     is_delete bit default 0
-- );

create table if not exists comment_movie(
	id int primary key auto_increment,
    movie_id int ,
    foreign key(movie_id) references movie(id),
    time_comment datetime,
    point_comment int ,
    content_comment text,
	is_delete bit default 0
);

create table if not exists room(
	id int primary key auto_increment,
	name varchar(50),
is_delete bit default 0,
    maximum_seats_in_room int
);

create table if not exists seat(
id int primary key auto_increment,
name varchar(50),
is_delete bit default 0
);

create table if not exists seat_type(
id int primary key auto_increment,
name varchar(50),
price int,
is_delete bit default 0
);

create table if not exists seat_room(
id int primary key auto_increment,
is_delete bit default 0,
room_id int,
seat_id int,
seat_type_id int,
foreign key(room_id) references room(id),
foreign key(seat_type_id) references seat_type(id),
foreign key(seat_id) references seat(id)
);

create table if not exists times(
id int primary key auto_increment,
is_delete bit default 0,
start_time varchar(10)
);

create table if not exists show_times(
id int primary key auto_increment,
is_delete bit default 0,
date_projection date,
times_id int,
movie_id int,
room_id int,
foreign key(movie_id) references movie(id),
foreign key(room_id) references room(id),
foreign key(times_id) references times(id)
);

create table  if not exists seat_detail(
id int primary key auto_increment,
is_delete bit default 0,
show_time_id int,
seat_room_id int references seat_room(id),
status_seat bit,
foreign key (show_time_id) references show_times(id)
);

create table if not exists ticket(
id int primary key auto_increment,
is_delete bit default 0,
customer_id int,
seat_detail_id int,
status_ticket int default 0,
ticket_booking_time datetime default now(),
promotion_id int,
 foreign key(promotion_id)  references promotion(id),
foreign key(customer_id) references customer(id),
foreign key(seat_detail_id) references seat_detail(id)
);

delimiter //
 create procedure sign_up(
 p_username varchar(30),
  p_password varchar(200),
  p_name varchar(30),
  p_day_of_birth varchar(30),
  p_gender int,
  p_id_card varchar(12),
  p_email varchar(100),
  p_address varchar(200),
  p_phone_number varchar(15),
  p_customer_type_id int)
  begin
	INSERT INTO user(username,password)
    VALUES(p_username,p_password);
    INSERT INTO user_role(username,role_id)
    VALUES(p_username,3);
    INSERT INTO customer(name, day_of_birth, gender, id_card, email, address, phone_number, customer_type_id,username)
    VALUES(p_name, p_day_of_birth, p_gender, p_id_card, p_email, p_address, p_phone_number, p_customer_type_id,p_username);
end //
 delimiter ;

-- drop trigger history_point;
DELIMITER $$
create trigger history_point
after update on ticket  for each row
begin
declare fc_point int ;
declare name_movie varchar(500);
select (seat_type.price *(1 - ifnull(promotion.discount, 0)/100 - if(customer.customer_type_id = 1, 1/10, 0)))/1000 into fc_point
from customer
            join ticket on customer.id = ticket.customer_id			
			join seat_detail on ticket.seat_detail_id = seat_detail.id
			join show_times on show_times.id = seat_detail.show_time_id
            join movie on movie.id = show_times.movie_id
            join seat_room on seat_room.id = seat_detail.seat_room_id
            join seat_type on seat_type.id = seat_room.seat_type_id
			left join promotion on promotion.id =ticket.promotion_id
            where ticket.id = new.id and ticket.status_ticket = 2;
            select movie.name into name_movie
             from ticket
			join seat_detail on ticket.seat_detail_id = seat_detail.id
			join show_times on show_times.id = seat_detail.show_time_id
            join movie on movie.id = show_times.movie_id
            where ticket.id = new.id;
insert into saving_point(customer_id,day_booking,point,content)
values(new.customer_id, new.ticket_booking_time,fc_point,name_movie);
end $$
DELIMITER ;
-- drop trigger update_customer_type;


DELIMITER $$
create trigger update_customer_type
after insert on saving_point  for each row
begin
declare sum_point int ;
select sum(saving_point.point) into sum_point
from saving_point
         where saving_point.customer_id = new.customer_id and point > 0;
          if sum_point  > 5000
               then update customer set customer_type_id = 1  where customer.id= new.customer_id;
           ELSEIF sum_point > 3000
                then update customer set customer_type_id = 2 where customer.id= new.customer_id;
            ELSEIF sum_point > 1500
               then update customer set customer_type_id = 3 where customer.id= new.customer_id;
           end if;
end $$
DELIMITER ;

-- add employee sp

 delimiter //
create procedure  sp_insert_employee( p_address varchar(200), p_day_of_birth varchar(30), p_email varchar(100),
 p_gender int, p_id_card varchar(12), p_image varchar(500) , p_name varchar(50) , p_phone_number varchar(15), 
 p_username varchar(30) , p_password varchar(255) )
begin 
insert into user(username,password)
    values(p_username,p_password);
insert into employee (
address ,
day_of_birth ,
email ,
gender ,
id_card,
 image,
 name,
 phone_number,
 username
 )
values ( p_address , p_day_of_birth , p_email, p_gender , p_id_card, p_image,  p_name, p_phone_number,p_username );
end //
delimiter ;

create view ticket_statement as
select ticket.id as id, customer.id as idCustomer, customer.name as nameCustomer,
movie.id as idMovie, movie.name as nameMovie,  show_times.date_projection as dateProjection, ticket.ticket_booking_time as bookingTime,
	seat_type.price *(1 - ifnull(promotion.discount, 0)/100 - if(customer.customer_type_id = 1, 1/10, 0)) as money,
    (seat_type.price *(1 - ifnull(promotion.discount, 0)/100 - if(customer.customer_type_id = 1, 1/10, 0)))/1000 as point
from customer join ticket on customer.id = ticket.customer_id			
			join seat_detail on ticket.seat_detail_id = seat_detail.id
			join show_times on show_times.id = seat_detail.show_time_id
            join movie on movie.id = show_times.movie_id
            join seat_room on seat_room.id = seat_detail.seat_room_id
            join seat_type on seat_type.id = seat_room.seat_type_id
            left join promotion on promotion.id =ticket.promotion_id
 where  ticket.status_ticket > 0 and ticket.is_delete = 0 ;

