var user={
	//增
	userinsert:'INSERT INTO `user` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)',
	//删
	userdelete: 'delete from user where id=?',
	//改
	userupdate:'UPDATE `user` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    getUserAll: 'select * from user',
    getUserById: 'select * from user where name=?'
}

module.exports=user;