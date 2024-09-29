const settings = require("../../config/settings");
const db = require("../models");
const Invite = db.Invite;
const User = db.User;

class InviteService {
    async sendInvite(userId, invitedEmail, role) {
        try {
            const user = await User.findOne({
                where: {id: userId},
            })
            if(!settings.team.invite.includes(user.role)) {
                throw new Error("User not authorized to send invite");
            }

            const invitedUser = User.findOne({
                where: {email: invitedEmail}
            })
            if(invitedUser) {
                throw new Error("Invited User already exists in team")
            }
            await Invite.create({
                invitedBy: userId,
                invitedEmail: invitedEmail,
                role: settings.user.role[role],
            });
        }
        catch(err) {
            throw new Error("Error sending Invite");
        }
    }
}

module.exports = InviteService;
