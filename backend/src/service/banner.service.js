const db = require("../models");
const Banner = db.Banner;

class BannerService {
  async getAllBanners() {
    return await Banner.findAll({
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async getBanners(userId) {
    return await Banner.findAll({
      where: {
        createdBy: userId
      },
      include: [{ model: db.User, as: "creator" }],
    });
  }

  async createBanner(data) {
    return await Banner.create(data);
  }

  async deleteBanner(id) {
    const rowsAffected = await Banner.destroy({ where: { id } });

    if (rowsAffected === 0) {
      return false;
    }

    return true;
  }

  async updateBanner(id, data) {
    const [affectedRows, updatedBanners] = await Banner.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0) {
      return null;
    }

    return updatedBanners[0];
  }

  async getBannerById(bannerId) {
    try {
      return await Banner.findOne({
        where: { id: bannerId },
      });
    } catch (error) {
      throw new Error("Error retrieving banner by ID");
    }
  }
}

module.exports = new BannerService();