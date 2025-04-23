const User  = require('../models/user.model');

exports.toggleUserLock = async (req,res,next) => { 

    try{
        const {id} = req.params;
    
    //kiểm tra user có tồn tại không
    const user = await User.findById(id);
    if(!user) return res.status(404).json({success: false,message: 'User not found'});

    // không cho khóa tài khoản admin
    if(user.role === 'admin') return res.status(403).json({success: false,message: 'Cannot lock admin account'});

    //chuyển đổi trạng thái khóa tài khoản/mở
    const newRole = user.role === 'locked' ? 'user' : 'locked';
    await User.updateRole(id, newRole);
    res.status(200).json({success: true,
        message: `User ${newRole === 'locked' ? 'locked' : 'unlocked'} thành công`,
    userId: id,
    newRole: newRole
    });


    } catch(err){
       next(err);
        
    }





}