import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class CulturaDTO {
    @Field()
    readonly codigo: number;

    @Field()
    readonly nombre: string;

    @Field()
    readonly descripcion: string;

}
