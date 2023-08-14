'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pembayaran', {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "petugas",
          key : "id_petugas"
        }
      },
      nisn: {
        type: Sequelize.STRING
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      bulan_dibayar: {
        type: Sequelize.STRING
      },
      tahun_dibayar: {
        type: Sequelize.STRING
      },
      id_spp: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : "siswa",
          key: "id_spp"
        }
      },
      jumlah_bayar: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pembayaran');
  }
};