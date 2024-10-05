// import {
//   Approval as ApprovalEvent,
//   SwapAndLiquify as SwapAndLiquifyEvent,
//   Transfer as TransferEvent
// } from "../generated/Banana/Banana"
// import { Approval, SwapAndLiquify, Transfer } from "../generated/schema"


// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.value = event.params.value

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

import { BigInt } from "@graphprotocol/graph-ts"
import {
  Banana,
  Transfer
} from "../generated/Banana/Banana"
import { Token, User } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let token = Token.load("1")
  if (!token) {
    token = new Token("1")
    let contract = Banana.bind(event.address)
    token.symbol = contract.symbol()
    token.name = contract.name()
    token.decimals = contract.decimals()
    token.totalSupply = contract.totalSupply()
  }
  token.save()

  let fromUser = User.load(event.params.from.toHexString())
  if (!fromUser) {
    fromUser = new User(event.params.from.toHexString())
    fromUser.address = event.params.from
    fromUser.balance = BigInt.fromI32(0)
    fromUser.token = token.id
  }
  fromUser.balance = fromUser.balance.minus(event.params.value)
  fromUser.save()

  let toUser = User.load(event.params.to.toHexString())
  if (!toUser) {
    toUser = new User(event.params.to.toHexString())
    toUser.address = event.params.to
    toUser.balance = BigInt.fromI32(0)
    toUser.token = token.id
  }
  toUser.balance = toUser.balance.plus(event.params.value)
  toUser.save()
}