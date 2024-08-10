const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Employee = require("../models/Employee.js");

router.get("/", (req, res, next) => {
  Employee.find({})
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  Employee.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/addemp", (req, res, next) => {
  Employee.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/updateemp/:id", (req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/deleteemp/:id", (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/resign/:id", (req, res, next) => {
  const { status = "C", effectenddate = new Date() } = req.body; // รับค่า status และ effectenddate จาก req.body

  // สร้าง object ที่จะถูกใช้ในการอัพเดต
  const updateData = {
    status: status, // อัพเดต status เป็นค่าใหม่ที่รับมาจาก req.body
    effectenddate: effectenddate, // อัพเดต effectenddate เป็นค่าใหม่ที่รับมาจาก req.body
  };

  // ใช้ Employee.findByIdAndUpdate() เพื่อค้นหาและอัพเดตข้อมูลของ Employee ตาม ID ที่ระบุ
  Employee.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(result); // ส่งข้อมูลที่ปรับปรุงแล้วกลับเป็น JSON
    })
    .catch((error) => {
      next(error); // ส่ง error ไปยัง middleware ถัดไปสำหรับการจัดการข้อผิดพลาด
    });
});

module.exports = router;
