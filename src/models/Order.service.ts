/** @format */

import { Member } from "../libs/types/member";
import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { Order, OrderItemInput } from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { Message } from "../libs/types/Errors";
import { HttpCode } from "../libs/types/Errors";
import { ObjectId } from "mongoose";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
  }

  public async createOrder(member: Member, input: OrderItemInput[]): Promise<Order> {
    console.log("input=>", input, member);
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;
    try {
      const newOrder = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      });
      console.log("orderId", newOrder._id);
      const orderId = newOrder._id;
      await this.recordOrderItem(orderId, input);
      //   TODO create items

      return newOrder;
    } catch (err) {
      console.log("Error model:createOrder", err);

      throw new Errors(HttpCode.BAD_RQUEST, Message.CREATE_FAILED);
    }
  }
  private async recordOrderItem(orderId: ObjectId, input: OrderItemInput[]): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      (item.orderId = orderId), (item.productId = shapeIntoMongooseObjectId(item.productId));
      await this.orderItemModel.create(item);
      return "INSERTED ";
    });
    console.log("promisedList", promisedList);
    const orderItemState = await Promise.all(promisedList);
    console.log("orderItemState", orderItemState);
  }
}

export default OrderService;
