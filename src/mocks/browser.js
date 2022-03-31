import { setupWorker } from "msw";
import {handlers} from './handlers';

export const worker = setupWorker(...handlers); //handler 배열 전달해주기
