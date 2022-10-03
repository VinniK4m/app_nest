import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturaEntity } from 'src/cultura/cultura.entity';
import { ProductoEntity } from 'src/producto/producto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class CulturaProductoService {
    constructor(
        @InjectRepository(CulturaEntity)
        private readonly culturaRepository: Repository<CulturaEntity>,
    
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>
    ) {}
    
    /* Obtener todos los productos de una cultura gastronómica 
       @GET culturaId/productos */
    async findProductsFromCulture(culturaId: number): Promise<ProductoEntity[]> {
        const cultura: CulturaEntity = await this.culturaRepository.findOne({where: {codigo: culturaId} , relations: ["productos"] } );
        if (!cultura)
            throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
        return cultura.productos
    }

    /* Obtener un producto de cultura gastronómica
       @GET culturaId/productos/productoId */
    async findProductFromCulture(culturaId: number, codigo: number): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {codigo} , relations: ["culturas"] } );
        if (!producto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND)
        const cultura: CulturaEntity = await this.culturaRepository.findOne({where: {codigo: culturaId} , relations: ["productos"] } );
        if (!cultura)
            throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
        const culturaProducto = cultura.productos.find(e => e.codigo === producto.codigo);
        if (!culturaProducto)
            throw new BusinessLogicException("El producto con el identificador entregado no esta asociado con la cultura", BusinessError.PRECONDITION_FAILED)
        return culturaProducto;
    }
    
    /* Asociar un producto a una cultura gastronómica
       @POST culturaId/productos/productoId */
    async addProductCulture(culturaId: number, productoId: number): Promise<CulturaEntity> {
      const producto: ProductoEntity = await this.productoRepository.findOne({where: {codigo: productoId}});
      if (!producto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND);
      const cultura: CulturaEntity = await this.culturaRepository.findOne({where: {codigo: culturaId} , relations: ["productos", "recetas"] } );
      if (!cultura)
            throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND);
      cultura.productos = [...cultura.productos, producto];
      return await this.culturaRepository.save(cultura);
    }
     

    /* Crear un producto de cultura gastronómica
       @POST culturaId/productos */
       /*async addProductToCulture(culturaId: number): Promise<CulturaEntity> {
        const cultura: CulturaEntity = await this.culturaRepository.findOne({where: {culturaId} , relations: ["productos"] } );
        
        if (!cultura)
            throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND);
        cultura.productos = [...cultura.productos];
        return await this.culturaRepository.create(cultura);
    }*/
    
    /* Actualizar un producto de cultura gastronómica
    @Put(':culturaId/productos/:productoId/') */
    /*async updateProductFromCulture(culturaId: number, codigo:number): Promise<CulturaEntity> {
        const cultura: CulturaEntity = await this.culturaRepository.findOne({where: {culturaId} , relations: ["productos"] } );
        if (!cultura)
          throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
        for(let ProductoEntity of cultura.productos){
          const producto: ProductoEntity = await this.productoRepository.findOne({where: {codigo} , relations: ["culturas"] });
          if (!producto)
            throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND)
        }
    
        cultura.productos = producto;
        return await this.culturaRepository.save(cultura);
      }
    /*
      async deleteProductFromCulture(culturaId: number, codigo: number) {
        const producto = await this.productoRepository.findOne({where: {codigo} , relations: ["culturas"] } );
        if (!producto)
          throw new BusinessLogicException("El producto con este identificador no fue encontrado", BusinessError.NOT_FOUND)
    
        const cultura = await this.culturaRepository.findOne({where: {culturaId} , relations: ["productos"] } );
        if (!cultura)
          throw new BusinessLogicException("La cultura con ese identificador no fue encontrada", BusinessError.NOT_FOUND)
    
        cultura.productos = cultura.productos.filter(e => e.codigo !== codigo);
        await this.culturaRepository.delete(cultura);
      }*/

}