import { rest } from "msw";
import Dummy from "./dummy.json";
import Alarm from "./alarm.json";
//import Goods from "./goods.json";
//import Gallery from "./gallery.json";

export const handlers = [
  rest.get("/GoodsProduct/all", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Dummy));
  }),
  rest.get("/alarm/all", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Alarm));
  }),  
  // rest.post("/usersgoods/add/products", (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(Goods));
  // }),
  rest.delete("/usersgoods", (req, res, ctx) => {
    const url = req.url.searchParams.get("usersGoodsId");
    return res(ctx.json({ url }, null));
  }),
  // rest.post("/gallery/img", (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(Gallery));
  // }),
];
