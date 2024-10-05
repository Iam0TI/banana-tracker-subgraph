import {
  Approval as ApprovalEvent,
  SwapAndLiquify as SwapAndLiquifyEvent,
  Transfer as TransferEvent
} from "../generated/Banana/Banana"
import { Approval, SwapAndLiquify, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapAndLiquify(event: SwapAndLiquifyEvent): void {
  let entity = new SwapAndLiquify(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokensSwapped = event.params.tokensSwapped
  entity.teamETH = event.params.teamETH
  entity.revETH = event.params.revETH
  entity.TreasuryETH = event.params.TreasuryETH

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
