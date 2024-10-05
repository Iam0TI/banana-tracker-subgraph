import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Approval, SwapAndLiquify, Transfer } from "../generated/Banana/Banana"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createSwapAndLiquifyEvent(
  tokensSwapped: BigInt,
  teamETH: BigInt,
  revETH: BigInt,
  TreasuryETH: BigInt
): SwapAndLiquify {
  let swapAndLiquifyEvent = changetype<SwapAndLiquify>(newMockEvent())

  swapAndLiquifyEvent.parameters = new Array()

  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "tokensSwapped",
      ethereum.Value.fromUnsignedBigInt(tokensSwapped)
    )
  )
  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "teamETH",
      ethereum.Value.fromUnsignedBigInt(teamETH)
    )
  )
  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam("revETH", ethereum.Value.fromUnsignedBigInt(revETH))
  )
  swapAndLiquifyEvent.parameters.push(
    new ethereum.EventParam(
      "TreasuryETH",
      ethereum.Value.fromUnsignedBigInt(TreasuryETH)
    )
  )

  return swapAndLiquifyEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
