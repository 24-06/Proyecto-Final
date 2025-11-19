import { PartialType } from "@nestjs/mapped-types";
import { CreateArtesanoDto } from "./create-artesano.dto";

export class UpdateArtesanoDto extends PartialType(CreateArtesanoDto) {}